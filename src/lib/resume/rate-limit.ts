import "server-only";

type Bucket = { hits: number[] };
const buckets = new Map<string, Bucket>();

/** Lightweight in-process limiter (defence in depth, not the sole access control). */
export async function allowRequest(key: string, limit: number, windowSeconds: number) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((time) => now - time < windowMs);
  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    return false;
  }
  bucket.hits.push(now);
  buckets.set(key, bucket);

  if (buckets.size > 5000) {
    for (const [entryKey, entry] of buckets) {
      if (entry.hits.length === 0 || now - entry.hits[entry.hits.length - 1]! > windowMs) {
        buckets.delete(entryKey);
      }
    }
  }
  return true;
}
