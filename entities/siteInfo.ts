import { Category } from './category';
import { IdentifiableEntity } from '../types/response';
import { Tag } from './tag';
import { Article } from './article';

export type BlackList = IdentifiableEntity<{
  ip: string[];
  email: string[];
  keyword: string[];
}>;

export type SiteInfo = {
  tags: Tag[];
  categories: Category[];
  blacklist: BlackList;
  hotArticles: Article[];
  bannerArticles: Article[];
};

export type QuerySiteInfoResponse = {
  siteinfo: SiteInfo;
};
