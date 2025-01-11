'use client';

import clsx from 'clsx';
import type { Language } from 'prism-react-renderer';
import { Highlight, themes } from 'prism-react-renderer';
import { calculateLinesToHighlight, hasTitle } from './utils';
import styles from './style.module.scss';
import { Key } from 'react';

export interface CodeBlockProps {
  codeString: string;
  language: Language;
  metastring: string | null;
  lineNumber?: boolean;
  lineHover?: boolean;
}

export interface HighlightedCodeTextProps {
  codeString: string;
  language: Language;
  highlightLine?: (index: number) => boolean;
  lineNumber?: boolean;
  lineHover?: boolean;
}

const HighlightedCodeText = ({
  codeString,
  language,
  highlightLine,
  lineNumber = false,
  lineHover = true,
}: HighlightedCodeTextProps) => {
  return (
    <Highlight code={codeString} language={language} theme={themes.vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={clsx(styles.pre, className)} style={style}>
          {tokens.map((line, index) => {
            const {
              className: lineClassName,
              key,
              ...lineRestProps
            } = getLineProps({
              className: highlightLine?.(index) ? styles.highlight : '',
              key: index,
              line,
            });
            // 如果只有一行时, 禁用lineNumber和lineHover
            const displayLineNumber = lineNumber && tokens.length > 1;
            const enabledLineHover = lineHover && tokens.length > 1;

            return (
              <div
                className={clsx(
                  styles.line,
                  lineClassName,
                  enabledLineHover && styles.hover,
                  !displayLineNumber && styles.hiddenLineNumber,
                )}
                data-testid={highlightLine?.(index) ? 'highlight-line' : 'line'}
                key={key as Key}
                {...lineRestProps}
              >
                {displayLineNumber ? (
                  <div className={styles.lineNumber}>{index + 1}</div>
                ) : null}
                <div className={styles.lineContent}>
                  {line.map((token, idx) => {
                    const { key: tokenKey, ...rest } = getTokenProps({
                      key: idx,
                      token,
                    });
                    return (
                      <span
                        data-testid="content-line"
                        key={tokenKey as Key}
                        {...rest}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

const CodeBlock = ({
  codeString,
  language,
  metastring,
  ...rest
}: CodeBlockProps) => {
  const highlightLineFn = calculateLinesToHighlight(metastring);
  const title = hasTitle(metastring);

  return (
    <div className={`${styles.codeBlock} group`} {...rest}>
      {title ? <div className={styles.codeTitle}>{title}</div> : null}
      <HighlightedCodeText
        codeString={codeString}
        highlightLine={highlightLineFn}
        language={language}
        {...rest}
      />
    </div>
  );
};

export default CodeBlock;
