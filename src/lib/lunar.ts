// Moon phase calculations for shell casting bias
const SYNODIC = 29.530588853; // days
const EPOCH = Date.UTC(2000, 0, 6, 18, 14, 0); // known new moon

export interface LunarInfo {
  fraction: number; // 0..1, 0≈New, 0.5≈Full
  phase: 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous'
       | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';
}

export function lunarInfo(date: Date = new Date()): LunarInfo {
  const days = (date.getTime() - EPOCH) / 86400000;
  let f = (days / SYNODIC) % 1;
  if (f < 0) f += 1;
  
  const phase =
    f < 0.03 || f > 0.97 ? 'New Moon' :
    f < 0.22 ? 'Waxing Crescent' :
    f < 0.28 ? 'First Quarter' :
    f < 0.47 ? 'Waxing Gibbous' :
    f < 0.53 ? 'Full Moon' :
    f < 0.72 ? 'Waning Gibbous' :
    f < 0.78 ? 'Last Quarter' : 'Waning Crescent';
    
  return { fraction: f, phase };
}