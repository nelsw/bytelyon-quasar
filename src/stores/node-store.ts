import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';
import { type QTreeLazyLoadParams } from 'quasar';
import type { Bot, BotNode } from 'src/types/model';
import { BotType } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const BotTypeIndex = (botType: BotType): number => {
  switch (botType) {
    case BotType.News:
      return 0;
    case BotType.Search:
      return 1;
    case BotType.Sitemap:
      return 2;
    default:
      return -1;
  }
};
const BotTypeIcon = (botType: BotType): string => {
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
const BotTypeLabel = (botType: BotType): string => {
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

const model = reactive<BotNode[]>([
  newRootNode(BotType.News),
  newRootNode(BotType.Search),
  newRootNode(BotType.Sitemap)
]);

const setBotNodes = (i: number, n: BotNode[]) => {
  if (model[i]?.children) model[i].children = n;
};

const setup = () => {

  const Load = async (d: QTreeLazyLoadParams): Promise<void> => {
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
    const t: BotType = d.node.id;
    const i: number = BotTypeIndex(t);
    return await api
      .get<BotNode[]>(`/bots?type=${t}`)
      .then((result: AxiosResponse<BotNode[]>) => {
        d.done(result.data);
        return result.data;
      })
      .then((nodes: BotNode[]) => nodes.length === 0 ? [newBotNode(t)] : nodes)
      .then((nodes: BotNode[]) => setBotNodes(i, nodes))
      .then(() => $notify.ok(model[i]?.children, `🤖`, `${BotTypeLabel(d.node.type)} Bots Loaded`))
      .catch($notify.err);
  };

  const lazyLoadBotResults = async (d: QTreeLazyLoadParams): Promise<boolean> => {
    return await api
      .get<BotNode[]>(`/bots?type=${d.node.type}&id=${d.node.id}`)
      .then((result: AxiosResponse<BotNode[]>) => {
        d.done(result.data);
        return result.data;
      })
      .then((nodes: BotNode[]) => nodes.length > 0
        ? $notify.ok(nodes, `✅`, 'Results Loaded')
        : $notify.ok(nodes, `⚠️`, 'No results found; Run the manager.'))
      .catch($notify.err);
  };

  const Remove = (node: BotNode): boolean => {

    console.debug('Remove', JSON.stringify(node, null, 2));

    const i: number = BotTypeIndex(node.type);
    if (i === -1) {
      console.warn('bad node type', node.type);
      return false;
    }

    for (let j = 0; j < (model[i]?.children?.length || 0); j++) {

      if (node.id === node.botId) {

        if (model[i]?.children?.[j]?.label !== node.label) {
          continue;
        }

        model[i]?.children?.splice(j, 1);

        if (model[i]?.children?.length === 0) {
          model[i]?.children?.push(newBotNode(node.type));
        }

        return true;
      }

      for (let k = 0; k < (model[i]?.children?.[j]?.children?.length || 0); k++) {
        if (model[i]?.children?.[j]?.children?.[k]?.label === node.label) {
          model[i]?.children?.[j]?.children?.splice(k, 1);
          return true;
        }
      }
    }

    return false;
  };

  const Insert = (bot: Bot): BotNode => {

    const node: BotNode = {
      id: bot.id,
      botId: bot.id,
      frequency: bot.frequency,
      target: bot.target,
      type: bot.type,
      rows: null,
      label: bot.target
    };

    console.debug('Insert', JSON.stringify(node, null, 2));

    const i: number = BotTypeIndex(node.type);
    if (i === -1) {
      console.warn('bad node type', node.type);
      return node;
    }

    if (model[i]?.children?.[0]?.label === 'New') {
      model[i]?.children?.splice(0, 1);
    }

    model[i]?.children?.push(node);
    model[i]?.children?.sort((a, b) => a.target.localeCompare(b.target));
    return node;
  };


  return {
    model,
    Load,
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
