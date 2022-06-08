import { dehydrate, QueryClient } from 'react-query';
import { getArchives } from '@/api/article';
import ArchiveView from '@/components/archive';
import { Layout, Navbar } from '@/components/common';
import { articleKeys } from '@/constants/queryKeys';
import { useArchives } from '@/hooks/article';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(articleKeys.archive(), () => getArchives());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600,
  };
};

const ArchivePage = () => {
  const archives = useArchives();

  useMount(() => {
    gtag.event('archive', {
      category: GAEventCategories.Archive,
    });
  });

  return (
    <Layout
      hero={
        <div className='space-y-20 bg-white py-10'>
          <Navbar />
          <div className='container px-4'>
            <h1 className='mb-4 text-3xl font-medium tracking-tight text-dark-3 md:text-5xl'>
              归档
            </h1>
            <p>将文章归档</p>
          </div>
        </div>
      }
    >
      <ArchiveView archives={archives.data} />
    </Layout>
  );
};

export default ArchivePage;
