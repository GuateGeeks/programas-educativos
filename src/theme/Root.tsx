import React from 'react';
import {AccessBoundary, AccessProvider, DemoNotice} from '@site/src/components/AccessControl';

export default function Root({children}: {children: React.ReactNode}): React.JSX.Element {
  return <AccessProvider><DemoNotice /><AccessBoundary>{children}</AccessBoundary></AccessProvider>;
}
