import ArticeList from '@/components/Article';
import Banner from '@/components/Banner';
import AppContext from '@/utils/context';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useContext, useMemo } from 'react';

type StaticProps = {
  name: string;
};
export const getServerSideProps: GetServerSideProps<StaticProps> = async ({ params }) => {
  return {
    props: {
      name: params?.name as string,
    },
  };
};

const Category = ({ name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const context = useContext(AppContext);
  const category = useMemo(() => {
    return context?.categories?.find(item => item.path === name);
  }, [name, context]);

  return (
    <div>
      <Head>
        <link rel='stylesheet' href='//at.alicdn.com/t/font_2836612_bmgp99va00d.css' />
      </Head>

      <Banner data={category} />

      <ArticeList query={{ category: category?.id }} />
    </div>
  );
};

export default Category;
