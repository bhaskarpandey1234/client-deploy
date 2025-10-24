export function flagEmojiFrom(code) {
  const cc = String(code || '').toUpperCase();
  if (cc.length !== 2) return '🏳️';
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (cc.charCodeAt(0) - 65)) +
         String.fromCodePoint(A + (cc.charCodeAt(1) - 65));
}
