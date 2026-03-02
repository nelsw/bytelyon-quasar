import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot, Err, NewsBot, SearchBot, SitemapBot } from 'src/types/model';
import { BotType, IsNewBot } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useNodeStore } from 'stores/node-store';
import type { AxiosError } from 'axios';
import { useLogger } from 'src/composable/useLogger';
import { useTokenStore } from 'stores/token-store';

const $notify = useNotifier();
const $tokenStore = useTokenStore();
const setup = () => {
  const $nodes = useNodeStore();

  const Save = async (b: Bot): Promise<boolean | void> => (IsNewBot(b) ? Create(b) : Update(b));

  const Create = async (b: Bot): Promise<boolean | void> => {
    $log.debug(b, `Create`);
    b.userID = $tokenStore.userID();
    return await api
      .post(`/bots/${b.type}`, b)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `🥳`, `Bot Created`))
      .catch($notify.err)
      .finally($nodes.Load);
  };

  const Update = async (b: Bot): Promise<boolean | void> => {
    $log.debug(b, `Updated`);
    b.userID = $tokenStore.userID();
    return await api
      .put(`/bots/${b.type}`, b)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `💾`, `Bot Updated`))
      .catch($notify.err)
      .finally($nodes.Load);
  };

  const $log = useLogger();
  const LoadSearchBots = async (): Promise<SearchBot[]> => {
    return await api
      .get<SearchBot[]>('/bots/search')
      .then((res: AxiosResponse<SearchBot[]>) => {
        $log.info(res.data, `LoadSearchBots`);
        return res.data;
      })
      .catch((err: AxiosError<Err>): SearchBot[] => {
        $log.err(err, `LoadSearchBots`);
        return [];
      });
  };

  const LoadSitemapBots = async (): Promise<SitemapBot[]> => {
    return await api
      .get<SitemapBot[]>('/bots/sitemap')
      .then((res: AxiosResponse<SitemapBot[]>) => {
        $log.info(res.data, `LoadSitemapBots`);
        return res.status === 200 ? res.data : [];
      })
      .catch((err: AxiosError<Err>): SitemapBot[] => {
        $notify.err(err);
        return [];
      });
  };

  const LoadNewsBots = async (): Promise<NewsBot[]> => {
    return await api
      .get<NewsBot[]>('/bots/news')
      .then((res: AxiosResponse<NewsBot[]>) => {
        $log.info(res.data, `LoadNewsBots`);
        return res.status === 200 ? res.data : [];
      })
      .catch((err: AxiosError<Err>): NewsBot[] => {
        $notify.err(err);
        return [];
      });
  };

  const Delete = async (type: BotType, target: string): Promise<boolean> => {
    if (type === BotType.Sitemap) {
      target = btoa(target)
    }
      return await api
        .delete(`/bots/${type}/id/${target}`)
        .then(() => $notify.ok(null, `🗑️`, `Bot Deleted`))
        .catch($notify.err)
        .finally($nodes.Load);
  };

  return {
    Save,
    Delete,
    LoadSearchBots,
    LoadSitemapBots,
    LoadNewsBots,
  };
};

export const useBotStore = defineStore('bot-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBotStore, import.meta.hot));
}
