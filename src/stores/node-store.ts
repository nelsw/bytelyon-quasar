import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { type QTreeLazyLoadParams } from 'quasar';
import type { BotNode} from 'src/types/model';
import { BotType } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();
const setup = () => {
  const searchModel: BotNode = reactive({
    id: BotType.Search,
    botId: '',
    target: '',
    type: BotType.Search,
    frequency: 1,
    rows: null,
    label: 'Search',
    icon: 'mdi-web',
    children: [],
    lazy: true,
  });
  const sitemapModel: BotNode = reactive({
    id: BotType.Sitemap,
    botId: '',
    target: '',
    type: BotType.Sitemap,
    frequency: 1,
    rows: null,
    label: 'Sitemap',
    icon: 'mdi-sitemap',
    children: [],
    lazy: true,
  });
  const newsModel: BotNode = reactive({
    id: BotType.News,
    botId: '',
    target: '',
    type: BotType.News,
    frequency: 1,
    rows: null,
    label: 'News',
    icon: 'mdi-newspaper',
    children: [],
    lazy: true,
  });

  const model: BotNode[] = reactive([newsModel, searchModel, sitemapModel]);



  const LazyLoad = async (d: QTreeLazyLoadParams): Promise<void> => {
    console.debug('LazyLoad', d);
    if (
      d.node.id === BotType.News ||
      d.node.id === BotType.Search ||
      d.node.id === BotType.Sitemap
    ) {
      await lazyLoadBots(d);
    } else {
      await lazyLoadBotResults(d);
    }
  };

  const lazyLoadBots = async (d: QTreeLazyLoadParams): Promise<boolean> => {
    return await api
      .get<Array<BotNode>>(`/bots?type=${d.node.id}`)
      .then((result: AxiosResponse<Array<BotNode>>) => {
        if (result.data && result.data.length > 0) {
          return result.data;
        }
        return [
          {
            id: '',
            botId: '',
            label: 'New',
            icon: 'mdi-plus',
            iconColor: 'green-13',
            frequency: 1,
            target: '',
            type: d.node.type,
            rows: null,
          },
        ];
      })
      .then((arr: Array<BotNode>) => {
        d.done(arr);
        return $notify.ok(arr, `🤖`, 'Bots Loaded');
      })
      .catch($notify.err);
  };

  const lazyLoadBotResults = async (d: QTreeLazyLoadParams): Promise<boolean> => {
    return await api
      .get<Array<BotNode>>(`/bots?type=${d.node.type}&id=${d.node.id}`)
      .then((result: AxiosResponse<Array<BotNode>>) => {
        d.done(result.data);
        if (result.data && result.data.length > 0) {
          return $notify.ok(result.data, `✅`, 'Results Loaded');
        } else {
          return $notify.ok(result.data, `⚠️`, 'No results found; Run the manager.');
        }
      })
      .catch($notify.err);
  };

  return {
    LazyLoad,
    model,
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
