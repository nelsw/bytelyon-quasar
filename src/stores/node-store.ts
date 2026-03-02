import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { Loading, type QTreeLazyLoadParams, type QTreeNode, uid } from 'quasar';
import type {
  Bot,
  BotData,
  NewsBot,
  NewsBotData,
  SearchBot,
  SearchBotData,
  SitemapBot,
  SitemapBotData, SitemapRow,
} from 'src/types/model';
import { BotType } from 'src/types/model';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { useLogger } from 'src/composable/useLogger';
import { useBotStore } from 'stores/bot-store';

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
  const $bots = useBotStore();
  const searchModel: QTreeNode = reactive({
    id: BotType.Search,
    label: 'Search',
    icon: 'mdi-web',
    children: [],
    bot: NewBot(BotType.Search),
  });
  const sitemapModel: QTreeNode = reactive({
    id: BotType.Sitemap,
    label: 'Sitemap',
    icon: 'mdi-sitemap',
    children: [],
    bot: NewBot(BotType.Sitemap),
  });
  const newsModel: QTreeNode = reactive({
    id: BotType.News,
    label: 'News',
    icon: 'mdi-newspaper',
    children: [],
    bot: NewBot(BotType.News),
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
        const nodes: QTreeNode[] = values.map((value: SearchBot[] | SitemapBot[] | NewsBot[]): QTreeNode => {
          if (values === null) {
            return [];
          }

          return value.map((bot: SearchBot | NewsBot |SitemapBot): QTreeNode => {
            return {
              id: uid(),
              label: bot.target,
              bot: bot,
              children: [],
              lazy: true,
            };
          });
        });

        for (const node of nodes) {
          if (node.bot.Type === BotType.Search) {
            searchModel?.children?.push(node);
          } else if (node.bot.Type === BotType.Sitemap) {
            sitemapModel?.children?.push(node);
          } else if (node.bot.Type === BotType.News) {
            newsModel?.children?.push(node);
          }
        }

        for (const node of model) {
          if (node?.children?.length || 0 > 0) {
            continue;
          }
          node?.children?.push({
            label: 'New',
            id: uid(),
            icon: 'mdi-plus',
            iconColor: 'green-13',
            selectable: false,
          });
        }
      })

      .catch((e) => console.log(e))
      .finally(Loading.hide);
  };

  const LazyLoad = async (d: QTreeLazyLoadParams): Promise<void> => {
    return await api
      .get<Array<BotData>>(`/bot/${d.node.bot.Type}/data/${d.node.bot.ID}`)
      .then((res: AxiosResponse<Array<BotData>>) => {
        const b: Array<BotData> = res.status === 200 ? res.data : [];
        $log.info(d, `LazyLoad Result Size [${b.length}]`);
        return b;
      })
      .then((data: Array<BotData>) => {
        switch (d.node.bot.Type) {
          /*
              Search & Sitemap
           */
          case BotType.Search:
          case BotType.Sitemap:
            return data.map((botData: BotData) => {

              let rows:Array<unknown> = [];

              if (d.node.bot.Type === BotType.Search) {
                rows = (botData as SearchBotData).pages;
              } else {
                rows = (botData as SitemapBotData).relative.map((s: string): SitemapRow => {
                  return { URL: s, IsExternal: false };
                });
                const rem = (botData as SitemapBotData).remote;
                if (rem != null) {
                  rem.map((s:string):SitemapRow => {
                    return { URL: s, IsExternal: true  }
                  }).forEach((row: SitemapRow) => rows.push(row))
                }
              }

              const bd = botData as SearchBotData | SitemapBotData;
              return {
                id: uid(),
                label: new Date(bd.createdAt || '').toLocaleString(),
                data: {
                  Bot: d.node.bot,
                  rows: rows,
                },
              };
            });
          /*
                News
             */
          case BotType.News:
            return Object.entries(
              Object.groupBy(data as Array<NewsBotData>, (newsBotData: NewsBotData) =>
                new Date(newsBotData.published).toLocaleDateString(),
              ),
            ).map((value) => {
              return {
                id: uid(),
                label: value[0],
                data: {
                  Bot: d.node.bot,
                  rows: value[1] ?? [],
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

  const DeleteSitemap = () => {
    searchModel.label = 'Search Test';
  };

  const DeleteNewsGroup = () => {
    searchModel.label = 'Search Test';
  };

  const test = () => {};

  return {
    Load,
    LazyLoad,
    model,
    DeleteNewsGroup,
    DeleteSitemap,
    test,
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
