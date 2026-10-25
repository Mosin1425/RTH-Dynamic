import React, { useEffect, useRef, useState } from 'react';
import { readTilt, startTilt } from '@/lib/tilt';

// A photo that moves in 3D: a depth map (white = near) shifts near parts of the image more than far
// parts as the viewer tilts their phone or moves the mouse. Plain WebGL, no 3D library.
// Falls back to the normal <img> if WebGL is unavailable. Renders only while on screen.

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform vec2 uTilt;
uniform vec2 uCover;
uniform float uStrength;
uniform float uZoom;
varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * uCover / uZoom + 0.5;
  float depth = texture2D(uDepth, uv).r;
  // Near pixels (depth ~1) move with the tilt, far ones (depth ~0) move slightly against it.
  vec2 offset = uTilt * (depth - 0.4) * uStrength;
  gl_FragColor = texture2D(uImage, uv + offset);
}`;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

function texture(gl, img) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}

/**
 * @param src     photo URL
 * @param depth   depth map URL (same framing as the photo)
 * @param strength how far near pixels travel (in texture units)
 * @param zoom    number or framer MotionValue; >1 crops in (also hides the edges the offset reveals)
 * @param motion  optional MotionValue 0..1 to scale the effect (e.g. fade it out while scrolling)
 */
export default function DepthPhoto({ src, depth, alt = '', className = 'relative', strength = 0.045, zoom = 1, motion, priority = false }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const zoomRef = useRef(zoom);
  const motionRef = useRef(motion);
  zoomRef.current = zoom;
  motionRef.current = motion;

  useEffect(() => {
    startTilt();
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    setReady(false);
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
    if (!gl) {
      setFailed(true);
      return undefined;
    }

    let disposed = false;
    let frame = 0;
    let visible = false;
    let images = null;
    const smooth = { x: 0, y: 0 };
    let program;
    let textures = [];

    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    } catch (err) {
      console.warn('DepthPhoto: WebGL setup failed', err);
      setFailed(true);
      return undefined;
    }

    const u = (name) => gl.getUniformLocation(program, name);
    const uTilt = u('uTilt');
    const uCover = u('uCover');
    const uStrength = u('uStrength');
    const uZoom = u('uZoom');
    gl.uniform1i(u('uImage'), 0);
    gl.uniform1i(u('uDepth'), 1);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      if (images) {
        // object-fit: cover
        const canvasAspect = w / h;
        const imgAspect = images[0].naturalWidth / images[0].naturalHeight;
        if (canvasAspect > imgAspect) gl.uniform2f(uCover, 1, imgAspect / canvasAspect);
        else gl.uniform2f(uCover, canvasAspect / imgAspect, 1);
      }
    };

    const render = () => {
      frame = 0;
      if (disposed || !images || !visible) return;
      const tilt = readTilt();
      smooth.x += (tilt.x - smooth.x) * 0.08;
      smooth.y += (tilt.y - smooth.y) * 0.08;
      const amount = motionRef.current ? motionRef.current.get() : 1;
      const z = typeof zoomRef.current === 'number' ? zoomRef.current : zoomRef.current.get();
      resize();
      // Extra 8% zoom keeps the shifted edges out of view.
      gl.uniform1f(uZoom, z * (1 + strength * 1.8));
      gl.uniform1f(uStrength, strength * amount);
      gl.uniform2f(uTilt, -smooth.x, smooth.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!frame && visible && images) frame = requestAnimationFrame(render);
    };

    Promise.all([loadImage(src), loadImage(depth)])
      .then((imgs) => {
        if (disposed) return;
        images = imgs;
        textures.forEach((t) => gl.deleteTexture(t));
        gl.activeTexture(gl.TEXTURE0);
        textures = [texture(gl, imgs[0])];
        gl.activeTexture(gl.TEXTURE1);
        textures.push(texture(gl, imgs[1]));
        resize();
        setReady(true);
        kick();
      })
      .catch(() => !disposed && setFailed(true));

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(canvas);

    const onLost = (e) => {
      e.preventDefault();
      setFailed(true);
    };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      textures.forEach((t) => gl.deleteTexture(t));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [src, depth, strength]);

  return (
    // Callers position the wrapper (default `relative`); e.g. pass `absolute inset-0` to fill a parent.
    <div className={`overflow-hidden ${className}`}>
      {/* Plain photo shows while textures load, and stays if WebGL isn't available. */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready && !failed ? 'opacity-0' : 'opacity-100'}`}
      />
      {!failed && (
        <canvas
          key={src}
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
