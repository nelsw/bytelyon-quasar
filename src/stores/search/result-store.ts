import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { type SearchBotData } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = ref<Array<SearchBotData[]>>([]);

  const findIndex = (botId: string): number => model.value.findIndex(a => a?.[0]?.botId === botId);

  const load = async (botId: string) => {
    loading.value = true;
    return await api
      .get<SearchBotData[]>(`/bots?type=search&id=${botId}`)
      .then((r: AxiosResponse<SearchBotData[]>) => {
        const idx = findIndex(botId);
        if (idx > 0) {
          model.value[idx] = r.data ?? [];
        } else {
          model.value.push(r.data ?? []);
        }
      })
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const Retrieve = async (botId: string): Promise<SearchBotData[]> => {
    loading.value = true;
    let res = model.value[findIndex(botId)];
    if (!res) await load(botId);
    res = model.value[findIndex(botId)] ?? [];
    loading.value = false;
    return res;
  };

  return {
    loading,
    model,
    Retrieve,
  };
};

export const useSearchBotResultsStore = defineStore('search-bot-results-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchBotResultsStore, import.meta.hot));
}
