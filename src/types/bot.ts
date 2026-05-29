import type { ULID } from 'ulid';

export type BotType = 'news' | 'search' | 'sitemap';

export type Bots = Bot[];

export type Bot = {
  id?: ULID;
  blacklist: string[];
  frequency: number;
  headless: boolean;
  target: Target;
  type: BotType;
  ranAt: Date;
};

export type Target = string;

export const Validate = (bot: Bot): string => {
  if (bot.type !== 'sitemap') return '';
  const validDomain = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i', // case-insensitive
  ).test(bot.target);
  if (!validDomain) return 'Invalid Domain';
  return ''
};

export const New = (type: BotType, target?: Target): Bot => ({
  blacklist: [],
  frequency: 1,
  headless: true,
  target: target ?? '',
  type,
  ranAt: new Date(0),
});
