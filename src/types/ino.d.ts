// Arduino sketches are imported into MDX as raw strings, via the
// `asset/source` webpack rule registered by the
// `guategeeks-arduino-sketch-raw-import` plugin in docusaurus.config.ts.
// This declaration tells TypeScript what such an import evaluates to.
declare module '*.ino' {
  const content: string;
  export default content;
}
