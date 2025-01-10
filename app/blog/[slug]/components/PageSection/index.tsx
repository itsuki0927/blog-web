'use client';

import classNames from 'clsx';
import { ReactNode, useEffect, useRef } from 'react';
import { useIndexContext } from './IndexProvider';

const isVisible = (element: HTMLElement) => {
  const { top } = element.getBoundingClientRect();
  return top < window.innerHeight / 2;
};

interface PageSectionProps {
  index: number;
  children: ReactNode;
  blogId: number;
}

function PageSection({ index, children, blogId }: PageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { set } = useIndexContext();

  useEffect(() => {
    if (ref.current && isVisible(ref.current)) {
      set(index);
    }
  }, [index, set]);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && isVisible(ref.current)) {
        set(index);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [index, set]);

  return (
    <section
      id={`pageSection${index}`}
      ref={ref}
      className={classNames(
        'group relative pb-8 max-w-[100vw]',
        'gap-y-6 sm:space-y-[1.5em]',
        'sm:block',
      )}
    >
      <hr className="border-gray8 border-dashed mb-10 lg:mb-16 group-first-of-type:hidden" />

      {children}

    </section>
  );
}

export default PageSection;
