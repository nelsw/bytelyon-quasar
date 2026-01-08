import { acceptHMRUpdate, defineStore } from 'pinia';
import { type QTreeNode } from 'quasar';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { BotColor, BotIcon } from 'src/types/base';

const id = 'bot-store';
const options = {};

const botIdx = (s: string): number => {
  switch (s) {
    case 'search':
      return 0;
    case 'news':
      return 1;
    case 'sitemap':
      return 2;
    default:
      return -1;
  }
};

const rootNode = (id: string, kids: QTreeNode[]): QTreeNode => {
  return {
    id: id,
    label: id.charAt(0).toUpperCase() + id.substring(1).toLowerCase(),
    icon: BotIcon(id),
    iconColor: BotColor(id),
    children: kids,
    lazy: true,
  };
};

const setup = () => {
  const model = ref<QTreeNode[]>([
    rootNode('search', []),
    rootNode('news', []),
    rootNode('sitemap', []),
  ]);

  const load = async (t: string) => {
    return await api
      .get<QTreeNode[]>('/prowler', { params: { type: t } })
      .then((res: AxiosResponse<QTreeNode[]>) => {
        model.value[botIdx(t)] = rootNode(t, res.data);
        return res.data;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return [] as QTreeNode[];
      });
  };

  const loadAll = async () => {
    const p3 = load('search');
    const p1 = load('news');
    const p2 = load('sitemap');
    return await Promise.all([p1, p2, p3])
      .then(() => {
        console.debug('✅ Nodes Loaded');
        return true;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  };

  const find = (type: string, id?: string, date?: string): QTreeNode | null => {
    const nodes: QTreeNode[] = model.value[botIdx(type)]?.children as QTreeNode[];
    let node: QTreeNode | null = null;
    if (id) {
      node = nodes?.find((n) => n.label === id) as QTreeNode;
      if (date) {
        node = node?.children?.find((n) => n.label === date) as QTreeNode;
      }
    }
    return node;
  };

  const Delete = async (id: string) => {
    return await api
      .delete(`/prowler`, { params: { id: id } })
      .then(() => true)
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  };

  const Save = async (o: object) => {
    return await api
      .put(`/prowler`, o)
      .then(()=>true)
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  }

  return {
    model,
    load,
    find,
    loadAll,
    Delete,
    Save,
  };
};

export const useBotStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBotStore, import.meta.hot));
}
