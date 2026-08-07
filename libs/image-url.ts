const DEFAULT_IMAGE = "/logo.png";

function getConfiguredImageHost() {
  const rawHost = [
    process.env.NEXT_PUBLIC_IMAGE_HOST_URL,
    process.env.IMAGE_HOST_URL,
    process.env.NEXT_PUBLIC_BASE_URL,
    process.env.imageHostUrl,
  ].find(Boolean);

  return rawHost?.replace(/\/$/, "") || "";
}

export function normalizeImageUrl(src?: string | null) {
  if (!src) return DEFAULT_IMAGE;

  const trimmed = src.trim();
  if (!trimmed) return DEFAULT_IMAGE;

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const host = getConfiguredImageHost();

  return host ? `${host}${normalized}` : normalized;
}

export function toAbsoluteImageUrl(src?: string | null) {
  return normalizeImageUrl(src);
}
