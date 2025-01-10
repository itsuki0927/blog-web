import { Database as DatabaseGenerated } from '@/types_db';
import { MergeDeep } from 'type-fest';
import { userAgent } from 'next/server';
import { BlogTag } from './blogTag';
import { Tag } from './tag';
import { Category } from './category';

export type UserAgent = ReturnType<typeof userAgent>;

export interface IPLocation {
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  zip: string;
  flag: string;
  ip: string;
}

export interface BlogReactions {
  reactions: [number, number, number, number];
}

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        blog: {
          Row: {
            blogTag: BlogTag[];
            tag: Tag[];
            category: Category;
            reactions: BlogReactions;
            views: number;
          };
        };
        comment_dev: {
          Row: {
            userAgent: UserAgent;
            geo: IPLocation | null;
            provider: string;
          };
          Insert: {
            userAgent: UserAgent;
            geo: IPLocation | null;
          };
          Update: {};
        };
        comment: {
          Row: {
            userAgent: UserAgent;
            geo: IPLocation | null;
            provider: string;
          };
          Insert: {
            userAgent: UserAgent;
            geo: IPLocation | null;
          };
          Update: {};
        };
      };
    };
  }
>;
