import type { Language } from 'prism-react-renderer';
import type { ReactElement, ReactNode } from 'react';

export interface PrePropsType {
  children?: ReactNode;
}

type ChildrenType = ReactElement | undefined;

const getChildren = ({ children }: PrePropsType): ChildrenType => {
  if (Array.isArray(children)) return children[0];
  return children as ChildrenType;
};

const getCodeString = (codeString: string | string[]) => {
  if (Array.isArray(codeString)) {
    return codeString.join('').trim();
  }
  return codeString.trim();
};

export const preToCodeBlock = (preProps: PrePropsType) => {
  const children = getChildren(preProps);

  if (children?.props) {
    const { className = '', ...props } = children.props;
    const codeString = getCodeString(children.props.children);

    const matches = className.match(/language-(?<lang>.*)/);
    return {
      className,
      codeString,
      language: matches?.groups?.lang
        ? (matches.groups.lang as Language)
        : ('' as Language),
      ...props,
    };
  }
};

const RE = /{([\d,-]+)}/;

export const calculateLinesToHighlight = (metastring: string | null) => {
  if (!metastring || !RE.test(metastring)) {
    return () => false;
  }
  const lineNumbers = RE.exec(metastring)![1]
    .split(',')
    .map((v) => v.split('-').map((val) => parseInt(val, 10)));
  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

const RETitle = /title=([a-zA-Z\u4e00-\u9fa5].+)/;

export const hasTitle = (metastring: string | null) => {
  if (!metastring) {
    return '';
  }
  const result = RETitle.exec(metastring) || ['', ''];
  return result[1];
};
