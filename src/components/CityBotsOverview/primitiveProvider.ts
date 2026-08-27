/**
 * Optional bridge point for a future TypeUI installation. The overview never
 * imports TypeUI directly: a missing bridge always resolves to the local CSS
 * Module implementation, keeping static builds and teacher previews intact.
 */
export type OverviewPrimitiveProvider = 'local' | 'typeui';

export function getOverviewPrimitiveProvider(): OverviewPrimitiveProvider {
  return typeof globalThis !== 'undefined' && '__TYPEUI__' in globalThis ? 'typeui' : 'local';
}
