import React from 'react';
import Link from '@docusaurus/Link';
import Footer from '@theme-original/Footer';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useAccessControl} from '@site/src/components/AccessControl';

export default function FooterWrapper(): React.JSX.Element {
  const {isDemo} = useAccessControl();
  const ciudadBotsUrl = useBaseUrl('/ciudadbots/');
  const showcaseUrl = useBaseUrl('/ciudadbots/showcase/');
  const coverageUrl = useBaseUrl('/ciudadbots/cobertura/');
  if (!isDemo) return <Footer />;
  return (
    <footer className="footer footer--dark">
      <div className="container container--fluid">
        <div className="row">
          <div className="col col--6">
            <h3>GuateGeeks · Demo institucional</h3>
            <p>Recorrido autorizado de CiudadBots.</p>
          </div>
          <div className="col col--6">
            <h3>Vistas disponibles</h3>
            <ul>
              <li><Link to={ciudadBotsUrl}>CiudadBots</Link></li>
              <li><Link to={showcaseUrl}>Showcase</Link></li>
              <li><Link to={coverageUrl}>Cobertura y progresión</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
