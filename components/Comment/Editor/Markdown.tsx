import { SendOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import React, { useContext, useState } from 'react';
import { Card, Button } from '@/components/ui';
import styles from './style.module.scss';
import CommentContext from '../context';

const DynamicMarkdown = dynamic(() => import('@/components/common/MarkdownEditor'), {
  ssr: false,
});

type MarkdownEditorProps = {
  onSend: (content: string) => Promise<boolean>;
};

const CommentMarkdownEditor = ({ onSend }: MarkdownEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { setReply } = useContext(CommentContext);

  return (
    <Card className={styles.markdown} bordered={false} bodyStyle={{ padding: 0 }}>
      <DynamicMarkdown code={content} onChange={setContent} />

      <div className={styles.actionBar}>
        <Button
          type='primary'
          className={styles.send}
          icon={<SendOutlined />}
          disabled={loading}
          onClick={() => {
            if (!content) {
              alert('请输入评论内容');
              return;
            }
            setLoading(true);
            onSend(content)
              .then(() => {
                setContent('');
                setReply(undefined);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? '发射中...' : '发射'}
        </Button>
      </div>
    </Card>
  );
};

export default CommentMarkdownEditor;
