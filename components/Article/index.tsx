import { Article } from '@/entities/article';
import { EyeOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import router from 'next/router';
import Card from '../Card';
import styles from './style.module.scss';

type ArticleCardProps = {
  article: Article;
};
const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card
      hoverable
      onClick={() => router.push(`/article/${article.id}`)}
      className={styles.article}
      cover={<img alt='example' className={styles.cover} src={article.cover} />}
      actions={[
        <span key='reading'>
          <EyeOutlined className={styles.action} />
          {article.reading}
        </span>,
        <span key='commenting'>
          <MessageOutlined className={styles.action} />
          {article.commenting}
        </span>,
        <span key='liking'>
          <HeartOutlined className={styles.action} />
          {article.liking}
        </span>,
      ]}
    >
      <Card.Meta title={article.title} description={article.description} />
    </Card>
  );
};

export default ArticleCard;
