import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';
import { MarkdownBlock } from '@/components/ui';
import { MarkdownEditorOptions } from '@/utils/editor';
import markedToHtml from '@/libs/marked';
import Toolbar from './Toolbar';
import styles from './style.module.css';
import useEditor from './useEditor';

export { useEditor };

export type MarkdownEditorProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  code: string;
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: (code: string) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  highlight?: (e: HTMLElement) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  options?: Partial<MarkdownEditorOptions>;
  // eslint-disable-next-line react/no-unused-prop-types
  style?: React.CSSProperties;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
};

const MarkdownEditor = ({ className, children, ...props }: MarkdownEditorProps) => {
  const [preview, setPreview] = useState(false);
  const { editorRef } = useEditor(props);
  const { placeholder } = props;

  return (
    <div className={classNames('bg-white-1 text-sm', className)}>
      <div className='relative'>
        <div
          placeholder={placeholder}
          className={classNames(
            styles.root,
            'max-h-[460px] min-h-[200px] overflow-y-scroll p-3 leading-5'
          )}
          ref={editorRef as any}
        />
        <MarkdownBlock
          className={classNames(
            'absolute left-0 right-0 top-0 bottom-0 cursor-not-allowed overflow-y-scroll bg-white-2 p-3 transition-all duration-300 ',
            preview ? 'z-10 h-full' : '-z-10 h-0'
          )}
          htmlContent={markedToHtml(props.code || '', {
            purify: true,
          })}
        />
      </div>

      <Toolbar preview={preview} onPreview={setPreview}>
        {children}
      </Toolbar>
    </div>
  );
};

export default MarkdownEditor;
