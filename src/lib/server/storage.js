// Simple in-memory storage for dev
const readings = new Map();
const tokens = new Map();
const emailIndex = new Map();
const resendMeta = new Map();

export async function getReading(id) {
  return readings.get(id) || null;
}

export async function setReading(r) {
  readings.set(r.id, r);
}

export async function deleteReading(id) {
  readings.delete(id);
}

export async function getReadingIdByToken(token) {
  return tokens.get(token) || null;
}

export async function setToken(token, id) {
  tokens.set(token, id);
}

export async function deleteToken(token) {
  tokens.delete(token);
}

export async function listAllReadings() {
  return Array.from(readings.values());
}

export async function setEmailLatest(emailHash, readingId) {
  emailIndex.set(emailHash, readingId);
}

export async function getEmailLatest(emailHash) {
  return emailIndex.get(emailHash) || null;
}

export async function getResendMeta(id) {
  return resendMeta.get(id) || null;
}

export async function setResendMeta(id, meta) {
  resendMeta.set(id, meta);
}
