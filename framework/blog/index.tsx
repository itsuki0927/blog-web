import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { Fetcher, MutationHook, SWRHook } from './utils/types';

const Blog = createContext<BlogContextValue<any> | Record<string, any>>({});

export type Provider = BlogConfig & {
  fetcher: Fetcher;
  articles?: {
    useSearch?: SWRHook<any>;
    useLikeArticle?: MutationHook<any>;
  };
  comment?: {
    useLikeComment?: MutationHook<any>;
  };
};

export type BlogConfig = {
  locale: string;
};

export type BlogContextValue<P extends Provider> = {
  providerRef: MutableRefObject<P>;
  fetcherRef: MutableRefObject<Fetcher>;
} & BlogConfig;

export type BlogProps<P extends Provider> = {
  children?: ReactNode;
  provider: P;
};

export type BlogProviderProps = {
  children?: ReactNode;
} & Partial<BlogConfig>;

export function CoreBlogProvider<P extends Provider>({
  provider,
  children,
}: BlogProps<P>) {
  const providerRef = useRef(provider);
  const fetcherRef = useRef(provider.fetcher);
  const { locale } = provider;
  const cfg = useMemo(() => ({ providerRef, fetcherRef, locale }), [locale]);

  return <Blog.Provider value={cfg}>{children}</Blog.Provider>;
}

export function getBlogProvider<P extends Provider>(provider: P) {
  return function BlogProvider({ children, ...props }: BlogProviderProps) {
    return (
      <CoreBlogProvider provider={{ ...provider, ...props }}>{children}</CoreBlogProvider>
    );
  };
}

export function useBlog<P extends Provider>() {
  return useContext(Blog) as BlogContextValue<P>;
}
