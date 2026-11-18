/** Prefix a root-relative path with the configured base (e.g. /jobsji). Safe client-side. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const p = path.startsWith('/') ? path : `/${path}`;
  if (base === '/' || base === '') return p;
  return `${base.replace(/\/$/, '')}${p}`;
}

/** Absolute canonical URL for a root-relative path. */
export function absoluteUrl(path: string, site: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const p = path.startsWith('/') ? path : `/${path}`;
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const origin = site.replace(/\/+$/, '');
  return `${origin}${normalizedBase}${p === '/' ? '/' : p}`;
}
