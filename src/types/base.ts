import type { QTreeNode } from 'quasar';

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

export const Options: Option[] = [
  { label: 'Never', value: 0 },
  { label: 'Hourly', value: hour },
  { label: 'Daily', value: hour * 24 },
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
  Search = 'Search',
  News = 'News',
  Sitemap = 'Sitemap',
}

export type BotType = BotEnum | string;

export interface Bot {
  type: BotType;
  icon: string;
  color: string;
}

export const index = (t: BotType): number =>
  Object.values(BotEnum).findIndex((key: string) => key === t.toString());
export const param = (t: BotType): string =>
  t.toString().charAt(0).toLowerCase() + t.toString().substring(1);
export const label = (t: BotType): string => t.toString();

const Serp: Bot = {
  type: BotEnum.Search,
  icon: 'mdi-web',
  color: 'indigo-14',
};
const News: Bot = {
  type: BotEnum.News,
  icon: 'mdi-newspaper',
  color: 'indigo-13',
};
const Site: Bot = {
  type: BotEnum.Sitemap,
  icon: 'mdi-sitemap-outline',
  color: 'indigo-12',
};

export const Bots: Bot[] = [Serp, News, Site];

export const Bot = (t: BotType): Bot | undefined => {
  switch (t as BotEnum) {
    case BotEnum.Search:
      return Serp;
    case BotEnum.News:
      return News;
    case BotEnum.Sitemap:
      return Site;
    default:
      return undefined;
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
    case 'search':
      return SearchIcon;
    case 'sitemap':
      return SitemapIcon;
    case 'news':
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
