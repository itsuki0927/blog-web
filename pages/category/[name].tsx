import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getArticles } from '@/api/article';
import { getAllCategoryPaths } from '@/api/category';
import { getGlobalData } from '@/api/global';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import { Banner, Loading } from '@/components/ui';
import { articleKeys, globalDataKeys } from '@/constants/queryKeys';
import { useCategoryArticles } from '@/hooks/article';
import { useGlobalData } from '@/hooks/globalData';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryPaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryPath = (params?.name ?? '').toString();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());
  await queryClient.prefetchQuery(articleKeys.category(categoryPath), () =>
    getArticles({ categoryPath })
  );

  return {
    props: {
      categoryPath,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

const CategoryPage = ({
  categoryPath,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const articles = useCategoryArticles(categoryPath);
  const { data } = useGlobalData();
  const category = data?.categories
    ? data.categories.find(item => item.path === categoryPath)
    : undefined;

  if (articles.isFetching || articles.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NextSeo
        title={`${category?.name} - ${category?.path} - Category`}
        description={category?.description}
      />

      <Banner className='mb-5'>分类: {category?.name}</Banner>

      <ArticleList {...articles} />
    </>
  );
};

CategoryPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default CategoryPage;
