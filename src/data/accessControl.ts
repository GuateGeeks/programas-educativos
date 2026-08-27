export type AccessProfile = 'catalog' | 'authorized' | 'demo';
export type AccessStatus = 'public' | 'checking' | 'authorized' | 'demo' | 'needs-grant' | 'denied' | 'expired';

export interface AccessGrant {
  version: 1;
  profile: Exclude<AccessProfile, 'catalog'>;
  program: 'ciudadbots' | 'all';
  allowedRoutes: readonly string[];
  locale: 'all' | 'es' | 'en';
  expiresAt: string;
  demoId: string;
}

export const DEMO_ALLOWED_ROUTES = Object.freeze([
  '/ciudadbots/',
  '/nivel-constructor/',
  '/ciudadbots/robot-cartografo/',
  '/ciudadbots/robot-de-entregas/',
  '/ciudadbots/montacargas/',
  '/ciudadbots/showcase/',
  '/ciudadbots/cobertura/',
]);

export const ACCESS_STORAGE_KEY = 'guategeeks-access-grant-v1';
const SITE_BASE = '/programas-educativos';

function cleanPath(pathname: string): string {
  let path = pathname.replace(/\/+$/, '') || '/';
  if (path === SITE_BASE) return '/';
  if (path.startsWith(`${SITE_BASE}/`)) path = path.slice(SITE_BASE.length) || '/';
  if (path === '/en') return '/';
  if (path.startsWith('/en/')) path = path.slice(3) || '/';
  return `${path.replace(/\/+$/, '') || '/'}/`.replace('//', '/');
}

export function isPublicPath(pathname: string): boolean {
  return cleanPath(pathname) === '/';
}

export function isRouteAllowed(grant: AccessGrant, pathname: string): boolean {
  if (grant.profile === 'authorized' || grant.program === 'all') return true;
  const route = cleanPath(pathname);
  return grant.allowedRoutes.some((allowed) => route === allowed);
}

export function isGrantExpired(grant: AccessGrant, now = Date.now()): boolean {
  const expiry = Date.parse(grant.expiresAt);
  return !Number.isFinite(expiry) || expiry <= now;
}

function validGrant(value: unknown): value is AccessGrant {
  if (!value || typeof value !== 'object') return false;
  const grant = value as Partial<AccessGrant>;
  return grant.version === 1
    && (grant.profile === 'authorized' || grant.profile === 'demo')
    && (grant.program === 'ciudadbots' || grant.program === 'all')
    && Array.isArray(grant.allowedRoutes)
    && typeof grant.expiresAt === 'string'
    && typeof grant.demoId === 'string'
    && (grant.locale === 'all' || grant.locale === 'es' || grant.locale === 'en');
}

function expiresInDays(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export function demoGrant(): AccessGrant {
  return {
    version: 1,
    profile: 'demo',
    program: 'ciudadbots',
    allowedRoutes: DEMO_ALLOWED_ROUTES,
    locale: 'all',
    expiresAt: expiresInDays(30),
    demoId: 'ciudadbots-demo',
  };
}

export function authorizedGrant(): AccessGrant {
  return {
    version: 1,
    profile: 'authorized',
    program: 'all',
    allowedRoutes: ['/'],
    locale: 'all',
    expiresAt: expiresInDays(90),
    demoId: 'authorized-local',
  };
}

export function grantFromQuery(search: string): AccessGrant | null {
  const params = new URLSearchParams(search);
  if (params.get('demo') === 'ciudadbots') return demoGrant();
  if (params.get('access') === 'authorized') return authorizedGrant();
  const encoded = params.get('grant');
  if (!encoded) return null;
  try {
    const decoded = decodeURIComponent(atob(encoded.replace(/-/g, '+').replace(/_/g, '/')));
    const parsed: unknown = JSON.parse(decoded);
    return validGrant(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function readStoredGrant(): AccessGrant | null {
  try {
    const raw = sessionStorage.getItem(ACCESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return validGrant(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function storeGrant(grant: AccessGrant): void {
  try {
    sessionStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(grant));
  } catch {
    // Private browsing or restricted storage: the current navigation still works.
  }
}

export function clearStoredGrant(): void {
  try {
    sessionStorage.removeItem(ACCESS_STORAGE_KEY);
  } catch {
    // Ignore unavailable storage.
  }
}

export function statusFor(pathname: string, grant: AccessGrant | null, ready: boolean): AccessStatus {
  if (isPublicPath(pathname)) return 'public';
  if (!ready) return 'checking';
  if (!grant) return 'needs-grant';
  if (isGrantExpired(grant)) return 'expired';
  return isRouteAllowed(grant, pathname)
    ? (grant.profile === 'demo' ? 'demo' : 'authorized')
    : 'denied';
}

export function isDemoAllowedPath(pathname: string): boolean {
  const route = cleanPath(pathname);
  return DEMO_ALLOWED_ROUTES.some((allowed) => route === allowed);
}
