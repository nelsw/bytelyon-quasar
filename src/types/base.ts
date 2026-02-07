import { JobType } from 'src/types/model';

export const clone = <T>(t: T): T => JSON.parse(JSON.stringify(t));

export const capitalize = (text: string) =>
  text.replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase());

export const truncateString = (s: string, l: number) =>
  s.length > l ? s.slice(0, l - 3) + '...' : s;

export const domain = (url: string) => {
  if (url.startsWith('https://')) {
    url = url.substring(url.indexOf('"https://"') + 1);
  }
  return url;
};

export enum BotEnum {
  Articles = 'articles',
  Sitemaps = 'sitemaps',
  Searches = 'searches',
}

export interface Bot {
  jobType: JobType;
  type: BotEnum;
  icon: string;
  color: string;
  label: string;
}

export const Bots: Bot[] = [
  {
    jobType: JobType.ARTICLE,
    type: BotEnum.Articles,
    icon: 'mdi-newspaper',
    color: 'deep-purple-13',
    label: 'Article',
  },
  {
    jobType: JobType.SEARCH,
    type: BotEnum.Searches,
    icon: 'mdi-web',
    color: 'indigo-14',
    label: 'Search',
  },
  {
    jobType: JobType.SITEMAP,
    type: BotEnum.Sitemaps,
    icon: 'mdi-sitemap',
    color: 'purple-14',
    label: 'Sitemap',
  },
];

export const Bot = (t: BotEnum): Bot => Bots.find((b: Bot) => b.type === t) as Bot;

export const SearchColor: string = 'indigo-14';
export const NewsColor: string = 'indigo-13';
export const SitemapColor: string = 'indigo-12';
