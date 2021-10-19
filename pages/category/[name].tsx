import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';
import { useContext, useMemo } from 'react';
import { getArticles } from '@/api/article';
import { getCategories } from '@/api/global';
import ArticeList from '@/components/Article';
import Banner from '@/components/Banner';
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import AppContext from '@/utils/context';

type StaticPathProps = {
  name: string;
};

type StaticProps = StaticPathProps & {
  articles: SearchResponse<Article>;
};

export const getStaticPaths: GetStaticPaths<StaticPathProps> = async () => {
  const categories = await getCategories();

  const paths = categories.data.map(item => ({
    params: { name: item.path },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async context => {
  const name = (context.params?.name ?? '') as string;
  const articles = await getArticles({
    category: name,
    pageSize: 2000,
  });

  return {
    props: {
      name,
      articles,
    },
  };
};

const CategoryPage = ({
  name,
  articles,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const context = useContext(AppContext);
  const category = useMemo(
    () => context?.categories?.find(item => item.path === name),
    [name, context]
  );

  return (
    <div>
      <Banner data={category} />

      <ArticeList articles={articles} />
    </div>
  );
};

export default CategoryPage;
