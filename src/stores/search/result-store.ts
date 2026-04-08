import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { type BotNode } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';
import { useSearchBotStore } from 'stores/search/bot-store';

 type NodeGroup = {
   BotId: string;
   Results: BotNode[];
 };

 const $store = useSearchBotStore();
const $notify = useNotifier();

const setup = () => {
  const loading = ref(false);

  const model = ref<NodeGroup[]>([]);

  const load = async (botId: string): Promise<boolean> => {

    if ($store.find(botId) === null) {
      $notify.warn('Bot not found');
      return false;
    }

    loading.value = true;
      return await api
        .get<BotNode[]>(`/bots?type=search&id=${botId}`)
        .then((result: AxiosResponse<BotNode[]>) => {
          const groups: NodeGroup[] = model.value.filter((g: NodeGroup) => g.BotId !== botId);
          const group = {
            BotId: botId,
            Results: result.data,
          };
          groups.push(group);
          model.value = groups;
          return group;
        })
        .then((group: NodeGroup) => $notify.ok(group, `🤖`, `Search Results Loaded`))
        .catch($notify.err);
  };

  const find = (botId: string): BotNode[] | null =>
    model.value.find((g: NodeGroup) => g.BotId === botId)?.Results ?? null;

  const get = async (botId: string): Promise<BotNode[] | null> => {
    let ng = find(botId);
    if (ng === null) {
      await load(botId);
      ng = find(botId);
    }
    return ng;
  };

  return {
    model,
    loading,
    load,
    find,
    get,
  }
}


export const useSearchBotResultsStore = defineStore('search-bot-results-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchBotResultsStore, import.meta.hot));
}
