import { BlogJsonLd, NextSeo } from 'next-seo';
import { CommentView } from '@/components/comment';
import { ImagePopup } from '@/components/ui';
import { Article } from '@/entities/article';
import { getArticleDetailUrl } from '@/utils';
import ArticleContent from '../ArticleContent';
import ArticleMeta from '../ArticleMeta';

interface ArticleViewProps {
  article: Article;
}

const ArticleView = ({ article }: ArticleViewProps) => (
  <div>
    <NextSeo
      title={article.title}
      description={article.description}
      additionalMetaTags={[{ name: 'keywords', content: article.keywords }]}
    />
    <BlogJsonLd
      url={getArticleDetailUrl(article.id)}
      title={article.title}
      images={[article.cover]}
      datePublished={article.createAt.toString()}
      dateModified={article.updateAt.toString()}
      authorName={article.author}
      description={article.description}
    />

    <ImagePopup
      ref={imagePopup => {
        (window as any).imagePopup = imagePopup;
      }}
    />

    <ArticleContent article={article} />

    <ArticleMeta article={article} />

    <CommentView
      articleId={article.id}
      // eslint-disable-next-line react/no-unstable-nested-components
      title={(_, length) => <span>{length} 个想法</span>}
      liking={article.liking}
    />
  </div>
);

export default ArticleView;
