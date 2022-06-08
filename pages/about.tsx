import { dehydrate, QueryClient } from 'react-query';
import AboutView from '@/components/about';
import { Layout, MyImage, Navbar } from '@/components/common';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AboutPage = () => {
  useMount(() => {
    gtag.event('about', {
      category: GAEventCategories.About,
    });
  });

  return (
    <Layout
      hero={
        <div className='space-y-20 bg-white py-10'>
          <Navbar />

          <section className='container flex flex-col-reverse items-start px-4 sm:flex-row'>
            <div className='flex w-full flex-col pr-8'>
              <h1 className='mb-1 text-3xl font-medium tracking-tight text-dark-4 md:text-5xl'>
                五木 - Itsuki
              </h1>
              <h2 className='mb-4'>
                {/* 字节跳动前端工程师 */}
                {/* <span className='font-semibold'>(待入职)</span> */}
              </h2>
              <p className='mb-10 text-lg'>
                Hi
                <span className='origin-[70% 70%] mx-1 inline-block animate-wave'>
                  👋
                </span>
                , 我是 五木, 喜欢 code 和 run 的前端dog
              </p>
            </div>
            <div className='relative mb-8 w-[80px] text-center sm:mb-0 sm:w-[176px]'>
              <MyImage
                alt='itsuki0927'
                height={121}
                width={121}
                src='/avatar.jpeg'
                circle
              />
            </div>
          </section>
        </div>
      }
    >
      <AboutView />
    </Layout>
  );
};

export default AboutPage;
