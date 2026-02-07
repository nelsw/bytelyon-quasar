import type { QTreeNode } from 'quasar';
import { JobType } from 'src/types/job';

const nano = 1;
const micro = nano * 1_000;
const milli = micro * 1_000;
const second = milli * 1_000;
const minute = second * 60;
export const hour = minute * 60;

export interface Option {
  readonly label: string;
  readonly value: string | number;
}

export const DailyOption: Option = { label: 'Daily', value: hour * 24 };

export const Options: Option[] = [
  { label: 'Once', value: 0 },
  { label: 'Hourly', value: hour },
  DailyOption,
  { label: 'Weekly', value: hour * 24 * 7 },
];

export const defaultOption = (): Option => Options[0] as Option;

export const optionLabel = (value: number): string => {
  for (const option of Options) {
    if (option.value === value) {
      return option.label;
    }
  }
  return 'Unknown';
};

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

export type BotType = BotEnum;

export interface Bot {
  jobType: JobType,
  type: BotType;
  icon: string;
  color: string;
}

export const UnknownBot = (): Bot => {
  return {} as Bot;
}

export const index = (t: BotType): number =>
  Object.values(BotEnum).findIndex((key: string) => key === t.toString());
export const param = (t: BotType): string =>
  t.toString().charAt(0).toLowerCase() + t.toString().substring(1);
export const label = (t: BotType): string => t.toString();

export const Searches: Bot = {
  jobType: JobType.SEARCH,
  type: BotEnum.Searches,
  icon: 'mdi-web',
  color: 'indigo-14',
};
export const Articles: Bot = {
  jobType: JobType.ARTICLE,
  type: BotEnum.Articles,
  icon: 'mdi-newspaper',
  color: 'deep-purple-13',
};
export const Sitemaps: Bot = {
  jobType: JobType.SITEMAP,
  type: BotEnum.Sitemaps,
  icon: 'mdi-sitemap',
  color: 'purple-14',
};

export const Bots: Bot[] = [Articles, Sitemaps, Searches];

export const Bot = (t: BotType): Bot => {
  switch (t) {
    case BotEnum.Articles:
      return Articles;
    case BotEnum.Sitemaps:
      return Sitemaps;
    case BotEnum.Searches:
      return Searches;
  }
};

export const BotTypeSingular = (bot: Bot, capitalize: boolean): string => {
  switch (bot) {
    case Searches:
      return capitalize ? 'Search' : 'search';
    case Articles:
      return capitalize ? 'Article' : 'article';
    case Sitemaps:
      return capitalize ? 'Sitemap' : 'sitemap';
    default:
      return '';
  }
};

export const BotNode = (bot: Bot, kids: QTreeNode[]): QTreeNode => {
  return {
    id: param(bot.type),
    label: label(bot.type),
    icon: bot.icon,
    expandable: true,
    iconColor: bot.color,
    selectable: true,
    children: kids,
  };
};

export interface Prowler {
  user_id?: string | undefined;
  id: string;
  type: string;
  prowled?: string | undefined;
  frequency: number;
  duration?: number | undefined;
  blacklist: string[];
  disabled: boolean;
}

export const SearchColor: string = 'indigo-14';
export const NewsColor: string = 'indigo-13';
export const SitemapColor: string = 'indigo-12';
export const NewsIcon: string = 'mdi-newspaper';
export const SitemapIcon: string = 'mdi-sitemap';
export const SearchIcon: string = 'mdi-web';
export const IdIcon: string = 'mdi-format-quote-open';
export const DateIcon: string = 'mdi-table-clock';

export const BotIcon = (s?: string): string => {
  switch (s?.split('/')[0]) {
    case 'searches':
      return SearchIcon;
    case 'sitemaps':
      return SitemapIcon;
    case 'articles':
      return NewsIcon;
    default:
      return '';
  }
};

export const BotColor = <T>(t: T): string => {
  switch (t?.toString().split('/')[0]) {
    case 'search':
      return SearchColor;
    case 'sitemap':
      return SitemapColor;
    case 'news':
      return NewsColor;
    default:
      return '';
  }
};
