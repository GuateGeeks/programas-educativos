import React from 'react';
import BasicoAlignment from '@site/src/components/BasicoAlignment';
import InternationalAlignment from '@site/src/components/InternationalAlignment';

/**
 * Combined básico-by-básico breakdown + international-standards progression.
 * The original HTML calls `basicoAlignment()` followed by `internationalAlignment()`
 * together on both the overview page and the Showcase page — this component
 * mirrors that pairing so it isn't hand-assembled twice.
 */
export default function StandardsProgression(): JSX.Element {
  return (
    <>
      <BasicoAlignment />
      <InternationalAlignment />
    </>
  );
}
