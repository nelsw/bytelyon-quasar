import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { type QTreeLazyLoadParams } from 'quasar';
import type { Bot, BotNode } from 'src/types/model';
import { BotType } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

export const BotTypeIcon = (botType: BotType): string => {
  switch (botType) {
    case BotType.Search:
      return 'mdi-web';
    case BotType.Sitemap:
      return 'mdi-sitemap';
    case BotType.News:
      return 'mdi-newspaper';
    default:
      return 'Unknown BotType: ' + (botType as string);
  }
};

export const BotTypeLabel = (botType: BotType): string => {
  switch (botType) {
    case BotType.Search:
      return 'Search';
    case BotType.Sitemap:
      return 'Sitemap';
    case BotType.News:
      return 'News';
    default:
      return 'Unknown BotType: ' + (botType as string);
  }
};

const newRootNode = (botType: BotType): BotNode => {
  return {
    id: botType,
    botId: '',
    target: '',
    type: botType,
    frequency: 1,
    rows: null,
    label: BotTypeLabel(botType),
    icon: BotTypeIcon(botType),
    children: [],
    lazy: true
  };
};

const newBotNode = (botType: BotType): BotNode => {
  return {
    id: '',
    botId: '',
    label: 'New',
    icon: 'mdi-plus',
    iconColor: 'green-13',
    frequency: 1,
    target: '',
    type: botType,
    rows: null,
    selectable: false
  };
};
const $notify = useNotifier();
const setup = () => {

  const model = reactive<Array<BotNode>>([
    newRootNode(BotType.News),
    newRootNode(BotType.Search),
    newRootNode(BotType.Sitemap)
  ]);

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
        return [newBotNode(d.node.type)];
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


  const Remove = (node: BotNode): boolean => {

    console.debug('Remove', JSON.stringify(node, null, 2));

    let index: number;
    if (node.type === BotType.News) {
      index = 0;
    } else if (node.type === BotType.Sitemap) {
      index = 1;
    } else if (node.type === BotType.Search) {
      index = 2;
    } else {
      console.warn('bad node type', node.type);
      return false;
    }

    const root: BotNode = model[index] as BotNode;
    for (let i = 0; i < (root.children as BotNode[]).length; i++) {

      const branch: BotNode = (root.children as BotNode[])[i] as BotNode;

      if (node.botId !== branch.botId) continue;

      if (node.id === branch.id) {
        (root.children as BotNode[]).splice(i, 1);
        if ((root.children as BotNode[]).length === 0) {
          (root.children as BotNode[]).push(newBotNode(node.type));
        }
        return true;
      }

      for (let j = 0; j < (branch.children as BotNode[]).length; j++) {
        if (node.id === ((branch.children as BotNode[])[j] as BotNode).id) {
          (((root.children as BotNode[])[i] as BotNode).children as BotNode[]).splice(j, 1);
          return true;
        }
      }
    }

    return false;
  };

  const Insert = (bot: Bot):BotNode => {

    const node:BotNode = {
      id: bot.id,
      botId: bot.id,
      frequency: bot.frequency,
      target: bot.target,
      type: bot.type,
      rows: null,
      label: bot.target,
    }

    console.debug('Insert', JSON.stringify(node, null, 2));

    let index: number;
    if (bot.type === BotType.News) {
      index = 0;
    } else if (bot.type === BotType.Sitemap) {
      index = 1;
    } else if (bot.type === BotType.Search) {
      index = 2;
    } else {
      console.warn('bad node type', node.type);
      return node;
    }

    model[index]?.children?.push(node)
    model[index]?.children?.sort((a, b) => a.target.localeCompare(b.target))
    return node;
  };

  return {
    LazyLoad,
    model,
    Insert,
    Remove
  };
};

export const useNodeStore = defineStore('node-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNodeStore, import.meta.hot));
}
