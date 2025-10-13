// WebAudio: soft surf "toss" + gentle "settle" chime.
// No assets needed; synthesized on the fly.

let ctx: AudioContext | null = null;
let enabled = true;
let volume = 0.7;

function ensureCtx() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx!;
}

export function setEnabled(v: boolean) { enabled = v; }
export function setVolume(v: number) { volume = Math.max(0, Math.min(1, v)); }

export function ensureStarted() { ensureCtx(); }

function envGain(c: AudioContext, dur: number, peak = 1, a = 0.005, r = 0.2) {
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(peak, c.currentTime + a);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + Math.max(a + 0.01, dur - r));
  return g;
}

function whiteNoise(c: AudioContext, dur: number) {
  const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
  const src = c.createBufferSource();
  src.buffer = buffer;
  return src;
}

function clink(c: AudioContext, freq: number, dur: number) {
  const o = c.createOscillator();
  o.type = 'triangle';
  o.frequency.setValueAtTime(freq, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(freq * 0.6, c.currentTime + dur * 0.9);
  return o;
}

export function playCast() {
  if (!enabled) return;
  const c = ensureCtx();

  // Surf whoosh
  const noise = whiteNoise(c, 0.28);
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 1200;

  const ng = envGain(c, 0.3, 0.9 * volume, 0.005, 0.18);
  noise.connect(lp).connect(ng).connect(c.destination);
  noise.start(); noise.stop(c.currentTime + 0.3);

  // 2–4 light clinks
  const count = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const t = 0.05 + i * 0.07;
    const o = clink(c, 800 + Math.random() * 500, 0.09);
    const g = envGain(c, 0.1, 0.6 * volume, 0.002, 0.07);
    o.connect(g).connect(c.destination);
    o.start(c.currentTime + t);
    o.stop(c.currentTime + t + 0.12);
  }
}

export function playSettle() {
  if (!enabled) return;
  const c = ensureCtx();

  // Soft two-note chime
  const base = 620 + Math.random() * 40;
  const freqs = [base, base * 1.33];

  freqs.forEach((f, idx) => {
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(f, c.currentTime);
    const g = envGain(c, 0.5, 0.55 * volume, 0.01, 0.25);
    o.connect(g).connect(c.destination);
    const start = c.currentTime + idx * 0.06;
    o.start(start);
    o.stop(start + 0.5);
  });
}

export function playRare() {
  if (!enabled) return;
  const c = ensureCtx();
  // soft shimmer arpeggio
  const base = 784; // G5-ish
  const tones = [1, 5/4, 3/2, 2].map(r => base * r);
  tones.forEach((f, i) => {
    const o = c.createOscillator();
    o.type = 'sine';
    const g = c.createGain();
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(0.5 * volume, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.5);
    o.frequency.setValueAtTime(f, c.currentTime);
    o.connect(g).connect(c.destination);
    const t = c.currentTime + 0.06 * i + 0.15;
    o.start(t); o.stop(t + 0.5);
  });
}