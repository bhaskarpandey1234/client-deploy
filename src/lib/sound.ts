// THEMEABLE WEB AUDIO • sound.ts
// Synth-only, no assets. Works with one shared AudioContext.

export type SoundTheme = 'Chime' | 'Harp' | 'Crystal' | 'Ocean' | 'Bowl';
export const THEMES: SoundTheme[] = ['Chime','Harp','Crystal','Ocean','Bowl'];

let ctx: AudioContext | null = null;
let enabled = true;
let volume = 0.7;
let theme: SoundTheme = 'Chime';

export function ensureStarted() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx!;
}
export function setEnabled(v: boolean){ enabled = v; }
export function setVolume(v: number){ volume = Math.max(0, Math.min(1, v)); }
export function setTheme(t: SoundTheme){ theme = t; }
export function getTheme(){ return theme; }

// ---------- small DSP helpers ----------
function envGain(c: AudioContext, dur: number, peak = 1, a = 0.01, r = 0.2) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.linearRampToValueAtTime(peak, c.currentTime + a);
  // decay to near-zero by dur
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + Math.max(a + 0.02, dur));
  return g;
}
function osc(c: AudioContext, type: OscillatorType, f: number) {
  const o = c.createOscillator();
  o.type = type; o.frequency.setValueAtTime(f, c.currentTime);
  return o;
}
function whiteNoise(c: AudioContext, dur: number) {
  const buf = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * dur)), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i=0;i<data.length;i++) data[i] = (Math.random()*2-1) * 0.6;
  const src = c.createBufferSource(); src.buffer = buf; return src;
}
function connectToOut(c: AudioContext, node: AudioNode) {
  const g = c.createGain(); g.gain.value = volume;
  node.connect(g).connect(c.destination);
}
function scheduleStop(src: { stop(t?: number): void }, c: AudioContext, dur: number){
  src.stop(c.currentTime + dur + 0.01);
}

// ---------- "Instruments" (tiny synth recipes) ----------
function inst_chime_cast(c: AudioContext) {
  // whoosh + a few soft clinks
  const noise = whiteNoise(c, 0.28);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1200;
  const g = envGain(c, 0.30, 0.9, 0.005, 0.18);
  noise.connect(lp).connect(g); connectToOut(c, g); noise.start(); scheduleStop(noise, c, 0.30);
  const count = 2 + Math.floor(Math.random()*3);
  for (let i=0;i<count;i++){
    const f = 800 + Math.random()*500;
    const o = osc(c, 'triangle', f);
    const g2 = envGain(c, 0.12, 0.6, 0.002, 0.08);
    o.connect(g2); connectToOut(c, g2); const t = c.currentTime + 0.05 + i*0.07;
    o.start(t); scheduleStop(o, c, 0.12);
  }
}
function inst_chime_settle(c: AudioContext) {
  const base = 620 + Math.random()*40; const ratios = [1, 4/3];
  ratios.forEach((r, i) => {
    const o = osc(c, 'sine', base*r); const g = envGain(c, 0.5, 0.55, 0.01, 0.25);
    o.connect(g); connectToOut(c, g); const t = c.currentTime + i*0.06; o.start(t); scheduleStop(o, c, 0.5);
  });
}
function inst_chime_rare(c: AudioContext) {
  const base = 784; const tones = [1, 5/4, 3/2, 2].map(r => base*r);
  tones.forEach((f, i) => {
    const o = osc(c, 'sine', f); const g = envGain(c, 0.5, 0.5, 0.01, 0.3);
    o.connect(g); connectToOut(c, g); const t = c.currentTime + 0.06*i + 0.15; o.start(t); scheduleStop(o, c, 0.5);
  });
}

function inst_harp_cast(c: AudioContext) {
  // gentle plucked arpeggio
  const base = 440 + Math.random()*30; const seq = [1, 5/4, 3/2].map(r => base*r);
  seq.forEach((f, i) => {
    const o = osc(c, 'triangle', f);
    const bp = c.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=f; bp.Q.value=8;
    const g = envGain(c, 0.25, 0.65, 0.003, 0.18);
    o.connect(bp).connect(g); connectToOut(c, g);
    const t = c.currentTime + i*0.08; o.start(t); scheduleStop(o, c, 0.25);
  });
}
function inst_harp_settle(c: AudioContext) {
  const base = 523.25; const seq = [3/2, 5/4, 1].map(r => base*r); // descend
  seq.forEach((f, i) => {
    const o = osc(c, 'triangle', f);
    const g = envGain(c, 0.35, 0.6, 0.004, 0.22);
    o.connect(g); connectToOut(c, g); const t=c.currentTime + i*0.07; o.start(t); scheduleStop(o, c, 0.35);
  });
}
function inst_harp_rare(c: AudioContext) {
  const base = 659.25; const seq = [1, 6/5, 4/3, 3/2, 2].map(r => base*r);
  seq.forEach((f, i) => {
    const o = osc(c, 'triangle', f);
    const g = envGain(c, 0.45, 0.6, 0.003, 0.28);
    o.connect(g); connectToOut(c, g); const t=c.currentTime + i*0.05; o.start(t); scheduleStop(o, c, 0.45);
  });
}

function inst_crystal_cast(c: AudioContext) {
  // airy shimmer + light ping
  const noise = whiteNoise(c, 0.18);
  const hp = c.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=1500;
  const g = envGain(c, 0.20, 0.45, 0.003, 0.14);
  noise.connect(hp).connect(g); connectToOut(c,g); noise.start(); scheduleStop(noise, c, 0.2);
  const f = 880 + Math.random()*120;
  const o = osc(c,'sine', f); const g2 = envGain(c, 0.25, 0.6, 0.004, 0.18);
  o.connect(g2); connectToOut(c,g2); o.start(); scheduleStop(o, c, 0.25);
}
function inst_crystal_settle(c: AudioContext) {
  const base = 740; const seq = [1, 5/4, 7/4]; // bright
  seq.forEach((r,i)=>{
    const o = osc(c,'sine', base*r); const g = envGain(c, 0.5, 0.6, 0.01, 0.3);
    o.connect(g); connectToOut(c,g); const t=c.currentTime + i*0.07; o.start(t); scheduleStop(o, c, 0.5);
  });
}
function inst_crystal_rare(c: AudioContext) {
  // longer shimmer
  const base = 880; const seq = [1, 9/8, 5/4, 3/2, 2];
  seq.forEach((r,i)=>{
    const o = osc(c,'sine', base*r); const g = envGain(c, 0.7, 0.55, 0.01, 0.45);
    o.connect(g); connectToOut(c,g); const t=c.currentTime + i*0.05; o.start(t); scheduleStop(o, c, 0.7);
  });
}

function inst_ocean_cast(c: AudioContext) {
  // swell + low "conch-ish" hint
  const noise = whiteNoise(c, 0.45);
  const lp = c.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=900;
  const g = envGain(c, 0.45, 0.9, 0.02, 0.28);
  noise.connect(lp).connect(g); connectToOut(c,g); noise.start(); scheduleStop(noise,c,0.45);
  const o = osc(c,'sine', 180 + Math.random()*40);
  const g2 = envGain(c, 0.5, 0.35, 0.02, 0.3);
  o.connect(g2); connectToOut(c,g2); const t=c.currentTime + 0.08; o.start(t); scheduleStop(o,c,0.5);
}
function inst_ocean_settle(c: AudioContext) {
  // short horn call
  const o = osc(c,'sine', 220);
  const g = envGain(c, 0.6, 0.55, 0.02, 0.4);
  o.connect(g); connectToOut(c,g); o.start(); scheduleStop(o,c,0.6);
}
function inst_ocean_rare(c: AudioContext) {
  // amplified wave + double horn
  inst_ocean_cast(c);
  const o1 = osc(c,'sine', 196), o2 = osc(c,'sine', 294);
  const g1 = envGain(c, 0.7, 0.5, 0.02, 0.5), g2 = envGain(c, 0.7, 0.45, 0.02, 0.5);
  o1.connect(g1); o2.connect(g2); connectToOut(c,g1); connectToOut(c,g2);
  const t = c.currentTime + 0.12; o1.start(t); o2.start(t+0.1);
  scheduleStop(o1,c,0.7); scheduleStop(o2,c,0.7);
}

function inst_bowl_cast(c: AudioContext) {
  // gentle strike → bowl ring
  const base = 392; // G
  const o1 = osc(c,'sine', base), o2 = osc(c,'sine', base*2);
  const g1 = envGain(c, 0.9, 0.5, 0.01, 0.7), g2 = envGain(c, 0.9, 0.3, 0.01, 0.7);
  o1.connect(g1); o2.connect(g2); connectToOut(c,g1); connectToOut(c,g2);
  o1.start(); o2.start(); scheduleStop(o1,c,0.9); scheduleStop(o2,c,0.9);
}
function inst_bowl_settle(c: AudioContext) {
  const base = 523.25; // C
  const o = osc(c,'sine', base);
  const g = envGain(c, 1.0, 0.55, 0.02, 0.8);
  o.connect(g); connectToOut(c,g); o.start(); scheduleStop(o,c,1.0);
}
function inst_bowl_rare(c: AudioContext) {
  const base = 523.25; const over = [1, 3/2, 2];
  over.forEach((r,i)=>{
    const o = osc(c,'sine', base*r); const g = envGain(c, 1.2, 0.5-(i*0.08), 0.02, 0.9);
    o.connect(g); connectToOut(c,g); o.start(); scheduleStop(o,c,1.2);
  });
}

// ---------- Theme router ----------
function route(fn: 'cast'|'settle'|'rare', c: AudioContext){
  switch(theme){
    case 'Chime':   return fn==='cast'?inst_chime_cast(c): fn==='settle'?inst_chime_settle(c): inst_chime_rare(c);
    case 'Harp':    return fn==='cast'?inst_harp_cast(c):  fn==='settle'?inst_harp_settle(c):  inst_harp_rare(c);
    case 'Crystal': return fn==='cast'?inst_crystal_cast(c):fn==='settle'?inst_crystal_settle(c):inst_crystal_rare(c);
    case 'Ocean':   return fn==='cast'?inst_ocean_cast(c): fn==='settle'?inst_ocean_settle(c): inst_ocean_rare(c);
    case 'Bowl':    return fn==='cast'?inst_bowl_cast(c):  fn==='settle'?inst_bowl_settle(c):  inst_bowl_rare(c);
  }
}

// ---------- Public cues ----------
export function playCast(){ if(!enabled) return; route('cast', ensureStarted()); }
export function playSettle(){ if(!enabled) return; route('settle', ensureStarted()); }
export function playRare(){ if(!enabled) return; route('rare', ensureStarted()); }