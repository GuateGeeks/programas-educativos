import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  clearStoredGrant,
  grantFromQuery,
  isGrantExpired,
  isRouteAllowed,
  readStoredGrant,
  statusFor,
  storeGrant,
  type AccessGrant,
  type AccessStatus,
} from '@site/src/data/accessControl';
import styles from './styles.module.css';

interface AccessContextValue {
  grant: AccessGrant | null;
  status: AccessStatus;
  isDemo: boolean;
  signOut: () => void;
}

const AccessContext = createContext<AccessContextValue | null>(null);

function blockInteraction(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}

export function AccessProvider({children}: {children: React.ReactNode}): React.JSX.Element {
  const location = useLocation();
  const [grant, setGrant] = useState<AccessGrant | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const queryGrant = grantFromQuery(location.search);
    const storedGrant = queryGrant || readStoredGrant();
    if (storedGrant && !isGrantExpired(storedGrant)) {
      storeGrant(storedGrant);
      setGrant(storedGrant);
    } else {
      clearStoredGrant();
      setGrant(null);
    }
    setReady(true);
  }, [location.search]);

  useEffect(() => {
    document.body.dataset.accessMode = grant?.profile === 'demo' ? 'demo' : 'full';
    return () => { delete document.body.dataset.accessMode; };
  }, [grant]);

  useEffect(() => {
    const lockedLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.theme-doc-sidebar-item-link, .menu__link'))
      .filter((link) => {
        if (grant?.profile !== 'demo' || !link.href) return false;
        const url = new URL(link.href, window.location.origin);
        return url.origin === window.location.origin && !isRouteAllowed(grant, url.pathname);
      });
    lockedLinks.forEach((link) => {
      link.dataset.demoHref = link.getAttribute('href') || '';
      link.dataset.demoLocked = 'true';
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('title', 'No disponible en esta demo');
      link.removeAttribute('href');
      link.tabIndex = -1;
      link.addEventListener('click', blockInteraction, true);
      link.addEventListener('keydown', blockInteraction, true);
    });
    return () => {
      document.querySelectorAll<HTMLAnchorElement>('.theme-doc-sidebar-item-link[data-demo-locked="true"], .menu__link[data-demo-locked="true"]').forEach((link) => {
        link.removeEventListener('click', blockInteraction, true);
        link.removeEventListener('keydown', blockInteraction, true);
        if (link.dataset.demoHref) link.setAttribute('href', link.dataset.demoHref);
        delete link.dataset.demoHref;
        delete link.dataset.demoLocked;
        link.removeAttribute('aria-disabled');
        link.removeAttribute('title');
        link.removeAttribute('tabindex');
      });
    };
  }, [grant, location.pathname]);

  const value = useMemo<AccessContextValue>(() => ({
    grant,
    status: statusFor(location.pathname, grant, ready),
    isDemo: grant?.profile === 'demo',
    signOut: () => {
      clearStoredGrant();
      setGrant(null);
    },
  }), [grant, location.pathname, ready]);

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccessControl(): AccessContextValue {
  const value = useContext(AccessContext);
  if (!value) throw new Error('useAccessControl must be used inside AccessProvider');
  return value;
}

export function AccessBoundary({children}: {children: React.ReactNode}): React.JSX.Element {
  const {status} = useAccessControl();
  // Keep SSR markup stable; the boundary takes effect immediately after hydration.
  if (status === 'public' || status === 'checking' || status === 'authorized' || status === 'demo') {
    return <>{children}</>;
  }
  return <AccessDenied status={status} />;
}

export function DemoNotice(): React.JSX.Element | null {
  const {isDemo, grant, signOut} = useAccessControl();
  const home = useBaseUrl('/ciudadbots/');
  if (!isDemo) return null;
  const expiry = grant ? new Date(grant.expiresAt).toLocaleDateString('es-GT') : '';
  return (
    <aside className={styles.notice} aria-label="Demo institucional activa">
      <div><strong>Demo institucional · CiudadBots</strong><span>Acceso a overview, módulos 01–03, Showcase y Cobertura y progresión{expiry ? ` · válida hasta ${expiry}` : ''}.</span></div>
      <div className={styles.noticeActions}><Link to={home}>Inicio demo</Link><button type="button" onClick={signOut}>Salir</button></div>
    </aside>
  );
}

function AccessDenied({status}: {status: AccessStatus}): React.JSX.Element {
  const home = useBaseUrl('/');
  const copy = status === 'expired'
    ? {eyebrow: 'Acceso expirado', title: 'Esta demo ya terminó.', body: 'Solicite un nuevo enlace institucional para continuar.'}
    : status === 'denied'
      ? {eyebrow: 'Contenido no incluido', title: 'Esta vista no forma parte de la demo.', body: 'El enlace institucional solo habilita el recorrido autorizado.'}
      : {eyebrow: 'Acceso requerido', title: 'Necesita un enlace autorizado.', body: 'Abra el enlace que le compartió GuateGeeks para ingresar al contenido.'};
  return (
    <main className={styles.denied} aria-labelledby="access-denied-title">
      <div className={styles.deniedCard}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h1 id="access-denied-title">{copy.title}</h1>
        <p>{copy.body}</p>
        <Link className={styles.homeLink} to={home}>Volver al catálogo</Link>
      </div>
    </main>
  );
}
