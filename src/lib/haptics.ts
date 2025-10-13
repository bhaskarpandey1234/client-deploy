let enabled = true;
export function setEnabled(v: boolean){ enabled = v; }
export function vibrate(pattern: number | number[]) {
  if (!enabled) return;
  if ('vibrate' in navigator) {
    try { navigator.vibrate(pattern as any); } catch {}
  }
}

export const CAST_PATTERN = [10, 18, 10];
export const SETTLE_PATTERN = [2, 22, 2];
export const LUCKY_PATTERN = [12, 60, 12, 60, 12];