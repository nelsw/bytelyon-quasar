import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { type QTreeNode, uid } from 'quasar';
import type { Bot, BotData, BotDatum, Bots, News } from 'src/types/model';
import { BotType, NewBot } from 'src/types/model';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { useLogger } from 'src/composable/useLogger';
import { domain } from 'src/types/base';
import { useBotStore } from 'stores/bot-store';
import { Loading } from 'quasar';
export interface LazyLoadDetails {
  /**
   * The node to which the new nodes (the children) will be appended
   */
  node: QTreeNode;
  /**
   * The key of the node getting the newly loaded child nodes
   */
  key: string;
  /**
   * The callback to be carried out when the loading is successful
   * @param children Array of nodes
   */
  done: (children?: readonly QTreeNode[]) => void;
  /**
   * The callback to be carried out should the loading fails
   */
  fail: () => void;
}

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

    await $bots.Load().then((bots: Bots) =>
      bots.map((bot: Bot): QTreeNode => {
        return {
          id: uid(),
          label: bot.Type === BotType.Sitemap ? domain(bot.Target) : bot.Target,
          bot: bot,
          children: [],
          lazy: true,
        };
      }),
    ).then((nodes: QTreeNode[]) => {
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
    }).finally(Loading.hide);
  };

  const LazyLoad = async (d: LazyLoadDetails): Promise<void> => {
    return await api
      .get<BotData>(`/${d.node.bot.Type}/bot/${d.node.bot.ID}`)
      .then((res: AxiosResponse<BotData>) => {
        const b: BotData = res.status === 200 ? res.data : [];
        $log.info(d, `LazyLoad Result Size [${b.length}]`);
        return b;
      })
      .then((data: BotData) => {
        if (d.node.bot.Type === BotType.News) {
          const groups = Object.groupBy(data as News[], (news: News) =>
            new Date(news.Published).toLocaleDateString(),
          );

          return Object.entries(groups).map((value) => {
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

        if (d.node.bot.Type === BotType.Sitemap) {
          return data.map((d: BotDatum) => {
            return {
              id: uid(),
              label: new Date(d.CreatedAt * 1000).toLocaleString(),
              data: d,
            };
          });
        }

        return [];
      })
      .then((nodes: QTreeNode[]) => {
        $log.debug(nodes, `LazyLoad ${d.key}`);
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
