import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useStandardsContent} from '@site/src/data/ciudadbots';
import CnbBlock from '@site/src/components/CnbBlock';

/**
 * Program-level (not module-specific) CNB alignment block, used only on the
 * overview page. Wraps useStandardsContent() so MDX can render it as a plain
 * element instead of calling a hook inline.
 */
export default function TransversalCnbBlock(): React.JSX.Element {
  const {transversalCnb} = useStandardsContent();
  return (
    <CnbBlock
      badge="CNB"
      title={translate({
        id: 'ciudadbots.overview.transversalCnbTitle',
        message: 'Alineación transversal Guatemala · Ciclo Básico',
      })}
      items={transversalCnb}
    />
  );
}
