import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

interface SketchBlockProps {
  /**
   * Raw sketch source, obtained by importing the `.ino` directly:
   *   import code from '@site/arduino/guategeeks/<dir>/<dir>.ino';
   */
  code: string;
  /** Filename to show as the block title and to use for the download. */
  filename: string;
}

/**
 * Shows an adopted Arduino sketch and offers it for download, both fed by the
 * same imported string.
 *
 * The download is built from `code` at click time rather than served as a
 * separate file, so there is no second copy that could fall out of date: the
 * `.ino` under `arduino/guategeeks/` is the only editable source, and editing
 * it changes what the page shows *and* what the student receives. See design
 * decision D11.
 */
export default function SketchBlock({code, filename}: SketchBlockProps): React.JSX.Element {
  function download(): void {
    const blob = new Blob([code], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const lineCount = code.trimEnd().split('\n').length;

  return (
    <div className={styles.wrapper}>
      <CodeBlock language="cpp" title={filename} showLineNumbers>
        {code}
      </CodeBlock>
      <div className={styles.actions}>
        <span className={styles.meta}>
          {translate(
            {
              id: 'guategeeks.sketchBlock.meta',
              message: '{lines} líneas · licencia MIT · sin librerías externas',
              description: 'Metadata line under an Arduino sketch listing',
            },
            {lines: lineCount},
          )}
        </span>
        <button type="button" className={styles.download} onClick={download}>
          {translate(
            {id: 'guategeeks.sketchBlock.download', message: 'Descargar {filename}'},
            {filename},
          )}
        </button>
      </div>
    </div>
  );
}
