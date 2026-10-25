// Shared "where is the viewer looking" input for the 3D effects, in the range -1..1 on each axis.
// Sources, in priority order: phone tilt (gyroscope), mouse position, then a slow idle drift so the
// scenes still feel alive when there is no input (and on iPhones until motion access is granted).

const target = { x: 0, y: 0 };
let lastInput = -Infinity;
let started = false;
let gyroActive = false;
let baseline = null;
const subscribers = new Set();

const clamp = (v) => Math.max(-1, Math.min(1, v));

function onPointer(e) {
  if (e.pointerType !== 'mouse') return;
  target.x = clamp((e.clientX / window.innerWidth) * 2 - 1);
  target.y = clamp((e.clientY / window.innerHeight) * 2 - 1);
  lastInput = performance.now();
}

function onOrientation(e) {
  if (e.gamma == null || e.beta == null) return;
  // Measure relative to how the phone was held when the first reading arrived.
  if (!baseline) baseline = { gamma: e.gamma, beta: e.beta };
  target.x = clamp((e.gamma - baseline.gamma) / 22);
  target.y = clamp((e.beta - baseline.beta) / 22);
  lastInput = performance.now();
  if (!gyroActive) {
    gyroActive = true;
    subscribers.forEach((fn) => fn());
  }
}

function attachGyro() {
  window.addEventListener('deviceorientation', onOrientation);
}

export function startTilt() {
  if (started || typeof window === 'undefined') return;
  started = true;
  window.addEventListener('pointermove', onPointer, { passive: true });
  // Android and desktop browsers deliver orientation events without asking; iOS needs a tap first.
  if (!needsGyroPermission()) attachGyro();
  // Re-centre when the phone is rotated.
  window.addEventListener('orientationchange', () => (baseline = null));
}

export function needsGyroPermission() {
  return (
    typeof window !== 'undefined' &&
    typeof window.DeviceOrientationEvent !== 'undefined' &&
    typeof window.DeviceOrientationEvent.requestPermission === 'function' &&
    !gyroActive
  );
}

export const isGyroActive = () => gyroActive;

// Must be called from a tap/click handler (iOS requirement).
export async function requestGyro() {
  try {
    const result = await window.DeviceOrientationEvent.requestPermission();
    if (result === 'granted') {
      attachGyro();
      return true;
    }
  } catch {
    /* denied or unsupported */
  }
  return false;
}

export function onGyroChange(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

// Current tilt. Falls back to a slow figure-of-eight drift after 2.5s without real input.
export function readTilt(now = performance.now()) {
  if (now - lastInput < 2500) return target;
  const t = now / 1000;
  return { x: Math.sin(t * 0.45) * 0.55, y: Math.sin(t * 0.3) * 0.3 };
}
