import type { QTreeNode } from 'quasar';

export interface OptionProps {
  readonly label: string;
  readonly value: string | number;
}

export class Option implements OptionProps {
  readonly label: string;
  readonly value: string | number;
  constructor(value: string | number) {
    this.label = typeof value === 'string' ? value : value.toString();
    this.value = value;
  }
}

export type OptionsProps = Array<OptionProps>;

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
  Search,
  News,
  Sitemap,
}

type BotType = string | BotEnum;

interface Bot<BotType> {
  type: BotType;
  icon: string;
  color: string;
}

// const param = (b: Bot<BotType>): string => b.type.toString().charAt(0).toLowerCase() + b.type.toString().substring(1);
// const index = (b: Bot<BotType>): number => parseInt(b.type.toString(), 10)

const Serp: Bot<BotType> = {
  type: BotEnum.Search,
  icon: 'mdi-search-web',
  color: 'deep-indigo-14'
};
const News: Bot<BotType> = {
  type: BotEnum.News,
  icon: 'mdi-newspaper',
  color: 'deep-indigo-13',
};
const Site: Bot<BotType> = {
  type: BotEnum.Sitemap,
  icon: 'mdi-sitemap-outline',
  color: 'deep-indigo-12',
};

export const Bots: Bot<BotType>[] = [Serp, News, Site];

export const BotNode = (bot: Bot<BotType>, kids: QTreeNode[]): QTreeNode => {
  return {
    id: bot.type.toString().charAt(0).toLowerCase(),
    label: bot.type.toString(),
    icon: bot.icon,
    expandable: true,
    iconColor: bot.color,
    selectable: true,
    children: kids,
  };
};

export const SearchColor: string = 'indigo-14';
export const NewsColor: string = 'indigo-13';
export const SitemapColor: string = 'indigo-12';
export const NewsIcon: string = 'mdi-newspaper';
export const SitemapIcon: string = 'mdi-sitemap-outline';
export const SearchIcon: string = 'mdi-search-web';

export const BotIcon = (s?: string): string => {
  switch (s) {
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
  switch (t) {
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
