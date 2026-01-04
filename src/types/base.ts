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

export const NewsColor: string = 'purple-12';
export const SitemapColor: string = 'deep-purple-12';
export const SearchColor: string = 'indigo-12';
export const NewsIcon: string = 'mdi-newspaper';
export const SitemapIcon: string = 'mdi-sitemap-outline';
export const SearchIcon: string = 'mdi-search-web';

export enum ProwlerType {
  Search = 'Search',
  Sitemap = 'Sitemap',
  News = 'News',
}

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
