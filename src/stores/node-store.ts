import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { Loading, type QTreeLazyLoadParams, type QTreeNode, uid } from 'quasar';
import type {
  Bot,
  BotNewsResult,
  BotResult,
  BotSearchResult,
  BotSitemapResult,
  SitemapRow,
} from 'src/types/model';
import { BotType } from 'src/types/model';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { useLogger } from 'src/composable/useLogger';
import { useBotStore } from 'stores/bot-store';
import { domain } from 'src/types/base';
import { decodeTime } from 'ulid';
import { useRouter } from 'vue-router';

export const NewBot = <T = BotType>(t: T): Bot<T> => {
  return {
    userID: '',
    type: t,
    frequency: 1,
    target: '',
    blackList: [],
    updatedAt: null,
  };
};

const $log = useLogger();

const setup = () => {
  const router = useRouter();
  const $bots = useBotStore();
  const handler = async (node: QTreeNode):Promise<void> => {
    await router.push(`/dashboard/${node.id}`);
  }

  const searchModel: QTreeNode = reactive({
    id: BotType.Search,
    label: 'Search',
    icon: 'mdi-web',
    children: [],
    bot: NewBot(BotType.Search),
    handler: handler,
  });
  const sitemapModel: QTreeNode = reactive({
    id: BotType.Sitemap,
    label: 'Sitemap',
    icon: 'mdi-sitemap',
    children: [],
    bot: NewBot(BotType.Sitemap),
    handler: handler,
  });
  const newsModel: QTreeNode = reactive({
    id: BotType.News,
    label: 'News',
    icon: 'mdi-newspaper',
    children: [],
    bot: NewBot(BotType.News),
    handler: handler,
  });

  const model: QTreeNode[] = reactive([searchModel, sitemapModel, newsModel]);

  const Load = async (): Promise<void> => {
    Loading.show({ spinnerColor: 'primary' });
    await new Promise((r) => setTimeout(r, 1000));

    model.forEach((node) => (node.children = []));
    model.splice(0, 3);
    model.push(searchModel, sitemapModel, newsModel);

    const searchBotPromise = $bots.LoadSearchBots();
    const sitemapBotPromise = $bots.LoadSitemapBots();
    const newsBotPromise = $bots.LoadNewsBots();

    Promise.all([searchBotPromise, sitemapBotPromise, newsBotPromise])
      .then((values) => {
        const nodes: QTreeNode[] = [];
        for (const value of values) {
          if (value === null) {
            continue;
          }
          for (const v of value) {
            nodes.push({
              id: uid(),
              label: v.type === BotType.Sitemap ? domain(v.target) : v.target,
              bot: v,
              children: [],
              lazy: true,
            });
          }
        }
        return nodes;
      })
      .then((nodes: QTreeNode[]) => {
        for (const node of nodes) {
          if (node?.bot?.type === BotType.Search) {
            searchModel?.children?.push(node);
          } else if (node?.bot?.type === BotType.Sitemap) {
            sitemapModel?.children?.push(node);
          } else if (node?.bot?.type === BotType.News) {
            newsModel?.children?.push(node);
          }
        }

        for (const node of model) {
          if (node?.children?.length === 0) {
            node?.children?.push({
              label: 'New',
              id: uid(),
              icon: 'mdi-plus',
              iconColor: 'green-13',
              selectable: false,
            });
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(Loading.hide);
  };

  const LazyLoad = async (d: QTreeLazyLoadParams): Promise<void> => {
    const bot = d.node.bot;

    return await api
      .get<Array<BotResult>>(`/bots?type=${bot.type}&id=${bot.id}`)
      .then((res: AxiosResponse<Array<BotResult>>) => {
        $log.info(res.data, `LazyLoad Result Size [${res.data.length}]`);

        return res.data;
      })
      .then((results: Array<BotResult>) => {
        if (results === null) {
          return [];
        }
        switch (bot.type) {
          /*
              Search & Sitemap
           */
          case BotType.Search:
          case BotType.Sitemap:
            return results.map((result: BotResult) => {
              let rows: Array<unknown> = [];

              if (bot.type === BotType.Search) {
                rows = (result as BotSearchResult).pages;
              } else {
                rows = (result as BotSitemapResult).relative.map((s: string): SitemapRow => {
                  return { URL: s, IsExternal: false };
                });
                const rem = (result as BotSitemapResult).remote;
                if (rem != null) {
                  rem
                    .map((s: string): SitemapRow => {
                      return { URL: s, IsExternal: true };
                    })
                    .forEach((row: SitemapRow) => rows.push(row));
                }
              }

              return {
                id: uid(),
                label: new Date(decodeTime(result.id)).toLocaleString(),
                data: {
                  Bot: bot,
                  result: result,
                  rows: rows,
                },
              };
            });
          /*
                News
             */
          case BotType.News:
            return Object.entries(
              Object.groupBy(
                results as Array<BotNewsResult>,
                (newsBotData: BotNewsResult) => newsBotData.publishedAt,
              ),
            ).map((result) => {
              return {
                id: uid(),
                label: result[0],
                data: {
                  Bot: d.node.bot,
                  result: result[1],
                  rows: result[1] ?? [],
                },
              };
            });
        }
        return [];
      })
      .then((nodes: QTreeNode[]) => {
        $log.debug(null, `LazyLoad ${d.key} [${nodes.length}]`);
        d.done(nodes);
      })
      .catch((err: AxiosError) => {
        $log.err(err, `LazyLoad ${d.key}`);
        d.fail();
      });
  };

  return {
    Load,
    LazyLoad,
    model
  };
};

export const useNodeStore = defineStore('node-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNodeStore, import.meta.hot));
}
