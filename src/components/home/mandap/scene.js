import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { readTilt, startTilt } from '@/lib/tilt';

/*
  A stylised Rajasthani wedding mandap, built entirely in code (no model files).
  setProgress(p) drives the build-up story as the user scrolls (0 → 1):
    0.00–0.25  pillars rise from the marble platform
    0.20–0.45  the domed canopy lowers into place
    0.42–0.68  drapes unfurl, garlands and flower strings appear
    0.62–0.90  diyas light up, warm glow and gold sparkles
  The whole mandap turns slowly with scroll; tilt/mouse nudges the camera.
*/

const GOLD = new THREE.MeshStandardMaterial({ color: '#d9ae4c', metalness: 1, roughness: 0.28 });
const GOLD_DARK = new THREE.MeshStandardMaterial({ color: '#a67b25', metalness: 1, roughness: 0.4 });
const MARBLE = new THREE.MeshStandardMaterial({ color: '#f4ede0', roughness: 0.32, metalness: 0.05 });
const IVORY = new THREE.MeshStandardMaterial({ color: '#fbf6ec', roughness: 0.5 });
const VELVET = new THREE.MeshStandardMaterial({ color: '#4f0a1c', roughness: 0.7 });
const CARPET = new THREE.MeshStandardMaterial({ color: '#5a0f24', roughness: 0.95 });
const FABRIC = new THREE.MeshStandardMaterial({ color: '#fff4e2', roughness: 0.85, side: THREE.DoubleSide, transparent: true, opacity: 0.94 });
const SWAG = new THREE.MeshStandardMaterial({ color: '#f3c74f', roughness: 0.7, side: THREE.DoubleSide });
const BACKDROP = new THREE.MeshStandardMaterial({ color: '#e9c98f', roughness: 0.8, side: THREE.DoubleSide });

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const range = (p, a, b) => clamp01((p - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const PILLAR_H = 3.3;
const HALF = 1.9; // pillar offset from centre
const TOP = 0.35 + PILLAR_H; // y of the canopy beams

function buildPlatform() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(3.9, 4.0, 0.18, 72), MARBLE);
  base.position.y = 0.09;
  const top = new THREE.Mesh(new THREE.CylinderGeometry(3.25, 3.4, 0.2, 72), MARBLE);
  top.position.y = 0.28;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(3.27, 0.035, 8, 96), GOLD);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.38;
  const rim2 = rim.clone();
  rim2.scale.setScalar(3.92 / 3.27);
  rim2.position.y = 0.18;
  const carpet = new THREE.Mesh(new THREE.CircleGeometry(2.3, 64), CARPET);
  carpet.rotation.x = -Math.PI / 2;
  carpet.position.y = 0.385;
  const border = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.025, 6, 96), GOLD);
  border.rotation.x = Math.PI / 2;
  border.position.y = 0.39;
  g.add(base, top, rim, rim2, carpet, border);
  return g;
}

function buildPillar() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), GOLD);
  base.position.y = 0.15;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, PILLAR_H - 0.6, 24), IVORY);
  shaft.position.y = PILLAR_H / 2;
  g.add(base, shaft);
  for (let i = 0; i < 5; i++) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 8, 24), GOLD);
    band.rotation.x = Math.PI / 2;
    band.position.y = 0.4 + i * ((PILLAR_H - 0.8) / 4);
    g.add(band);
  }
  const capital = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.14, 0.3, 24), GOLD);
  capital.position.y = PILLAR_H - 0.15;
  g.add(capital);
  return g;
}

function buildCanopy() {
  const g = new THREE.Group();
  // Square frame of beams
  for (let i = 0; i < 4; i++) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(HALF * 2 + 0.5, 0.22, 0.22), GOLD);
    const a = (i * Math.PI) / 2;
    beam.position.set(Math.sin(a) * HALF, 0, Math.cos(a) * HALF);
    beam.rotation.y = a;
    g.add(beam);
  }
  // Velvet dome with gold ribs
  const dome = new THREE.Mesh(new THREE.SphereGeometry(1.75, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), VELVET);
  dome.scale.y = 0.85;
  dome.position.y = 0.12;
  g.add(dome);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.76, 0.06, 10, 96), GOLD);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.12;
  g.add(ring);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const points = [];
    for (let t = 0; t <= 16; t++) {
      const phi = (t / 16) * (Math.PI / 2);
      points.push(new THREE.Vector3(Math.cos(a) * Math.cos(phi) * 1.77, 0.12 + Math.sin(phi) * 1.77 * 0.85, Math.sin(a) * Math.cos(phi) * 1.77));
    }
    const rib = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 24, 0.025, 6), GOLD);
    g.add(rib);
  }
  // Kalash finial
  const kalash = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), GOLD);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.18, 16), GOLD);
  neck.position.y = 0.22;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.45, 16), GOLD);
  tip.position.y = 0.52;
  kalash.add(pot, neck, tip);
  kalash.position.y = 0.12 + 1.75 * 0.85 + 0.12;
  g.add(kalash);
  // Small chhatri domes on the corners
  for (const [x, z] of [[HALF, HALF], [-HALF, HALF], [HALF, -HALF], [-HALF, -HALF]]) {
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), GOLD);
    c.position.set(x, 0.1, z);
    const t = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.25, 10), GOLD_DARK);
    t.position.set(x, 0.45, z);
    g.add(c, t);
  }
  return g;
}

// A curtain hanging from a beam; its vertices are animated each frame for pleats and sway.
function buildDrape(width, height, material = FABRIC) {
  const geo = new THREE.PlaneGeometry(width, height, 36, 18);
  geo.translate(0, -height / 2, 0); // hang from the top edge
  const mesh = new THREE.Mesh(geo, material);
  mesh.userData.base = Float32Array.from(geo.attributes.position.array);
  mesh.userData.size = { width, height };
  return mesh;
}

function animateDrape(mesh, time, open) {
  const pos = mesh.geometry.attributes.position;
  const base = mesh.userData.base;
  const { width, height } = mesh.userData.size;
  const half = width / 2;
  for (let i = 0; i < pos.count; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const v = -y / height; // 0 at top, 1 at bottom
    // Classic tie-back: each half of the curtain is gathered toward its pillar around 60% height,
    // stays full at the top and flares out a little below the tie.
    const gather = open * 0.92 * Math.exp(-Math.pow((v - 0.6) / 0.3, 2));
    const nx = x < 0 ? -half + (x + half) * (1 - gather) : half - (half - x) * (1 - gather);
    const folds = 10 + gather * 26; // fabric bunches into tighter folds where it's gathered
    const pleat = Math.sin((x / width) * Math.PI * folds) * (0.035 + gather * 0.06);
    const sway = Math.sin(time * 1.2 + x * 1.5 + v * 2.2) * 0.045 * v;
    pos.array[i * 3] = nx;
    pos.array[i * 3 + 2] = pleat + sway;
  }
  pos.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
}

function catenary(a, b, sag, segments = 24) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = a.clone().lerp(b, t);
    p.y -= Math.sin(t * Math.PI) * sag;
    pts.push(p);
  }
  return new THREE.CatmullRomCurve3(pts);
}

// Marigold garlands spiralling up each pillar plus strings hanging from the front beam.
function buildFlowers() {
  const sphere = new THREE.SphereGeometry(0.058, 10, 8);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.8 });
  const items = [];
  const pillars = [[HALF, HALF], [-HALF, HALF], [HALF, -HALF], [-HALF, -HALF]];
  for (const [px, pz] of pillars) {
    for (let i = 0; i < 64; i++) {
      const t = i / 63;
      const a = t * Math.PI * 7;
      items.push([px + Math.cos(a) * 0.19, 0.45 + t * (PILLAR_H - 0.85), pz + Math.sin(a) * 0.19]);
    }
  }
  const strands = 11;
  for (let s = 0; s < strands; s++) {
    const x = -HALF + 0.2 + (s / (strands - 1)) * (HALF * 2 - 0.4);
    const len = 8 + Math.round(Math.abs(Math.sin(s * 1.7)) * 6);
    for (let i = 0; i < len; i++) items.push([x, TOP - 0.18 - i * 0.11, HALF + 0.12]);
  }
  const mesh = new THREE.InstancedMesh(sphere, mat, items.length);
  const m = new THREE.Matrix4();
  const colors = [new THREE.Color('#f59e0b'), new THREE.Color('#fb8c00'), new THREE.Color('#facc15'), new THREE.Color('#fff1c1')];
  items.forEach(([x, y, z], i) => {
    m.makeTranslation(x, y, z);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, colors[i % 11 === 0 ? 3 : i % 3]);
  });
  mesh.userData.positions = items;
  return mesh;
}

function buildSeat() {
  const g = new THREE.Group();
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.32, 0.65), VELVET);
  seat.position.y = 0.55;
  const back = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.12, 32, 1, false, 0, Math.PI), VELVET);
  back.rotation.x = Math.PI / 2;
  back.rotation.z = Math.PI;
  back.position.set(0, 0.75, -0.28);
  back.scale.set(1, 1, 1);
  const frame = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.035, 8, 48, Math.PI), GOLD);
  frame.position.set(0, 0.75, -0.26);
  const legs = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.7), GOLD);
  legs.position.y = 0.48;
  g.add(legs, seat, back, frame);
  g.position.set(0, 0, -0.5);
  return g;
}

function buildPots() {
  const g = new THREE.Group();
  const roseMat = new THREE.MeshStandardMaterial({ color: '#f9a8c3', roughness: 0.7 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: '#fff6f0', roughness: 0.7 });
  for (const x of [-2.6, 2.6]) {
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 1.1, 12), GOLD);
    stand.position.set(x, 0.95, 1.6);
    g.add(stand);
    for (let i = 0; i < 14; i++) {
      const a = i * 2.4;
      const r = 0.16 + (i % 3) * 0.06;
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), i % 2 ? roseMat : whiteMat);
      b.position.set(x + Math.cos(a) * r, 1.55 + (i % 4) * 0.07, 1.6 + Math.sin(a) * r);
      g.add(b);
    }
  }
  return g;
}

function buildDiyas() {
  const g = new THREE.Group();
  const flames = [];
  const bowlGeo = new THREE.SphereGeometry(0.1, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const flameGeo = new THREE.SphereGeometry(0.06, 10, 8);
  const count = 10;
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + Math.PI / count;
    const bowl = new THREE.Mesh(bowlGeo, GOLD_DARK);
    bowl.position.set(Math.cos(a) * 3.0, 0.48, Math.sin(a) * 3.0);
    const flame = new THREE.Mesh(flameGeo, new THREE.MeshBasicMaterial({ color: '#ffb547', transparent: true, opacity: 0 }));
    flame.scale.y = 1.8;
    flame.position.set(bowl.position.x, 0.56, bowl.position.z);
    flame.userData.seed = i * 1.37;
    flames.push(flame);
    g.add(bowl, flame);
  }
  return { group: g, flames };
}

// Warm fairy-light bulbs strung in loops along the canopy beams.
function buildFairyLights() {
  const items = [];
  for (let side = 0; side < 4; side++) {
    const a = (side * Math.PI) / 2;
    const n = 16;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const along = -HALF + t * HALF * 2;
      const sag = Math.abs(Math.sin(t * Math.PI * 3)) * 0.22; // three small loops per side
      const x = Math.sin(a) * (HALF + 0.14) + Math.cos(a) * along;
      const z = Math.cos(a) * (HALF + 0.14) - Math.sin(a) * along;
      items.push([x, TOP - 0.16 - sag, z]);
    }
  }
  const mesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.035, 8, 6),
    new THREE.MeshBasicMaterial({ color: '#ffd38a', transparent: true, opacity: 0 }),
    items.length
  );
  const m = new THREE.Matrix4();
  items.forEach(([x, y, z], i) => mesh.setMatrixAt(i, m.makeTranslation(x, y, z)));
  return mesh;
}

function buildSparkles(count) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const speed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 1 + Math.random() * 4.5;
    const a = Math.random() * Math.PI * 2;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = Math.random() * 6;
    pos[i * 3 + 2] = Math.sin(a) * r;
    speed[i] = 0.15 + Math.random() * 0.35;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  // Soft round sprite
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,240,200,1)');
  grad.addColorStop(0.3, 'rgba(255,205,110,0.8)');
  grad.addColorStop(1, 'rgba(255,190,80,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const mat = new THREE.PointsMaterial({
    size: 0.16,
    map: new THREE.CanvasTexture(c),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0,
  });
  const points = new THREE.Points(geo, mat);
  points.userData.speed = speed;
  return points;
}

function blobShadow() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
  grad.addColorStop(0, 'rgba(0,0,0,0.55)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(11, 11),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.002;
  return mesh;
}

export function createMandapScene(canvas, { reducedMotion = false, mobile = false } = {}) {
  startTilt();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  const camera = new THREE.PerspectiveCamera(mobile ? 42 : 34, 1, 0.1, 100);
  const lookAt = new THREE.Vector3(0, 2.7, 0);

  // Lights
  const hemi = new THREE.HemisphereLight('#fff3dc', '#1b3f33', 0.7);
  const key = new THREE.DirectionalLight('#fff1d6', 1.6);
  key.position.set(5, 9, 6);
  const warm = new THREE.PointLight('#ffb35c', 0, 9, 1.6);
  warm.position.set(0, 2.2, 0.6);
  const rimLight = new THREE.PointLight('#ffcf7a', 0, 14, 1.4);
  rimLight.position.set(0, 1, 4.2);
  scene.add(hemi, key, warm, rimLight);

  // Mandap
  const mandap = new THREE.Group();
  scene.add(mandap);
  scene.add(blobShadow());
  mandap.add(buildPlatform());

  const pillars = [];
  for (const [x, z] of [[HALF, HALF], [-HALF, HALF], [HALF, -HALF], [-HALF, -HALF]]) {
    const p = buildPillar();
    p.position.set(x, 0.38, z);
    pillars.push(p);
    mandap.add(p);
  }

  const canopy = buildCanopy();
  mandap.add(canopy);

  const drapes = [];
  const drapeH = PILLAR_H - 0.5;
  // Back: a full gold backdrop that stays closed. Sides: ivory curtains that tie back.
  for (const [x, z, ry, backdrop] of [[0, -HALF, 0, true], [-HALF, 0, Math.PI / 2, false], [HALF, 0, -Math.PI / 2, false]]) {
    const d = buildDrape(HALF * 2 - 0.3, drapeH, backdrop ? BACKDROP : FABRIC);
    d.position.set(x, TOP - 0.05, z);
    d.rotation.y = ry;
    d.userData.backdrop = backdrop;
    drapes.push(d);
    mandap.add(d);
  }

  // Front swags: two fabric arcs hanging between the front pillars
  const swags = new THREE.Group();
  for (const [sag, y] of [[0.55, TOP - 0.12], [0.35, TOP - 0.05]]) {
    const curve = catenary(new THREE.Vector3(-HALF, y, HALF + 0.05), new THREE.Vector3(HALF, y, HALF + 0.05), sag);
    swags.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.07, 8), sag > 0.4 ? SWAG : FABRIC));
  }
  mandap.add(swags);

  const flowers = buildFlowers();
  mandap.add(flowers);
  const seat = buildSeat();
  mandap.add(seat);
  const pots = buildPots();
  mandap.add(pots);
  const diyas = buildDiyas();
  mandap.add(diyas.group);
  const fairy = buildFairyLights();
  mandap.add(fairy);
  const sparkles = buildSparkles(mobile ? 160 : 320);
  scene.add(sparkles);

  // Hide parts that appear later
  const flowerMatrix = new THREE.Matrix4();

  let progress = 0;
  let width = 1;
  let height = 1;
  let frame = 0;
  let running = false;
  let last = performance.now();
  let time = 0;
  const smoothTilt = { x: 0, y: 0 };
  const clock = { flowerScale: -1 };

  function frameCamera() {
    // Fit the mandap (about 8.4 wide, 6.4 tall) in the middle of the screen, leaving the top and
    // bottom bands free for the heading and captions, whatever the aspect ratio.
    const aspect = width / height;
    camera.aspect = aspect;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const fitWidth = 4.4 / (Math.tan(hFov / 2) * 0.95);
    const fitHeight = 3.4 / (Math.tan(vFov / 2) * (aspect < 1 ? 0.62 : 0.56));
    return Math.max(fitWidth, fitHeight);
  }
  let baseDistance = 12;

  function update(dt) {
    const p = progress;
    if (!reducedMotion) time += dt;

    // 1. Pillars rise
    pillars.forEach((pl, i) => {
      const t = easeOutBack(range(p, 0.02 + i * 0.04, 0.18 + i * 0.04));
      pl.scale.set(1, Math.max(0.001, t), 1);
    });

    // 2. Canopy lowers
    const c = easeOut(range(p, 0.2, 0.42));
    canopy.position.y = TOP + (1 - c) * 4.5;
    canopy.visible = p > 0.18;
    canopy.rotation.y = (1 - c) * 0.8;

    // 3. Drapes unfurl and tie back, flowers grow in
    const d = easeOut(range(p, 0.42, 0.62));
    drapes.forEach((dr) => {
      dr.visible = d > 0.001;
      dr.scale.y = Math.max(0.001, d);
      animateDrape(dr, time, dr.userData.backdrop ? 0.08 : 0.3 + range(p, 0.52, 0.68) * 0.7);
    });
    swags.visible = d > 0.05;
    swags.scale.set(1, 1, 1).multiplyScalar(0.6 + d * 0.4);
    const f = easeOutBack(range(p, 0.46, 0.66));
    if (Math.abs(f - clock.flowerScale) > 0.001) {
      clock.flowerScale = f;
      flowers.userData.positions.forEach(([x, y, z], i) => {
        const s = Math.max(0.001, f);
        flowerMatrix.makeScale(s, s, s).setPosition(x, y, z);
        flowers.setMatrixAt(i, flowerMatrix);
      });
      flowers.instanceMatrix.needsUpdate = true;
    }
    seat.scale.setScalar(Math.max(0.001, easeOutBack(range(p, 0.1, 0.25))));
    pots.scale.setScalar(Math.max(0.001, easeOutBack(range(p, 0.5, 0.68))));

    // 4. Lights on
    const l = range(p, 0.64, 0.86);
    warm.intensity = l * 6;
    rimLight.intensity = l * 6;
    key.intensity = 1.6 - l * 0.8;
    hemi.intensity = 0.7 - l * 0.35;
    renderer.toneMappingExposure = 1.05 + l * 0.15;
    diyas.flames.forEach((fl) => {
      const flicker = reducedMotion ? 1 : 0.85 + Math.sin(time * 9 + fl.userData.seed) * 0.08 + Math.sin(time * 23 + fl.userData.seed * 3) * 0.07;
      fl.material.opacity = l * flicker;
      fl.scale.set(1, 1.8 * flicker, 1);
    });
    fairy.material.opacity = range(p, 0.66, 0.8) * (reducedMotion ? 1 : 0.85 + Math.sin(time * 3) * 0.15);
    sparkles.material.opacity = range(p, 0.66, 0.9) * 0.9;
    if (!reducedMotion && sparkles.material.opacity > 0) {
      const pos = sparkles.geometry.attributes.position;
      const speed = sparkles.userData.speed;
      for (let i = 0; i < speed.length; i++) {
        pos.array[i * 3 + 1] += speed[i] * dt;
        if (pos.array[i * 3 + 1] > 6) pos.array[i * 3 + 1] = 0;
      }
      pos.needsUpdate = true;
    }

    // Turn with scroll (plus a slow idle spin), camera moves closer as it builds
    mandap.rotation.y = -0.5 + p * Math.PI * 1.15 + (reducedMotion ? 0 : time * 0.04);
    const tilt = readTilt();
    smoothTilt.x += (tilt.x - smoothTilt.x) * 0.05;
    smoothTilt.y += (tilt.y - smoothTilt.y) * 0.05;
    const dist = baseDistance * (1.08 - easeOut(range(p, 0, 0.9)) * 0.1);
    const orbit = smoothTilt.x * 0.35;
    camera.position.set(Math.sin(orbit) * dist, 3.6 + (1 - p) * 1.4 - smoothTilt.y * 0.8, Math.cos(orbit) * dist);
    camera.lookAt(lookAt);
  }

  function loop(now) {
    frame = 0;
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(loop);
  }

  return {
    setProgress(p) {
      progress = clamp01(p);
    },
    resize(w, h) {
      width = Math.max(1, w);
      height = Math.max(1, h);
      renderer.setSize(width, height, false);
      baseDistance = frameCamera();
      camera.updateProjectionMatrix();
      if (!running) {
        update(0);
        renderer.render(scene, camera);
      }
    },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
    },
    dispose() {
      this.stop();
      scene.traverse((obj) => {
        obj.geometry?.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
        mats.forEach((m) => {
          m.map?.dispose();
          m.dispose();
        });
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
