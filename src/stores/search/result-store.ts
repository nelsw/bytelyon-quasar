import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { type SearchBotData } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = reactive(new Map<string, SearchBotData[]>());

  const load = async (botId: string): Promise<boolean> => {
    loading.value = true;
    return await api
      .get<SearchBotData[]>(`/bots?type=search&id=${botId}`)
      .then((r: AxiosResponse<SearchBotData[]>) => model.set(botId, r.data))
      .then(() => $notify.ok(model, `🤖`, `Search Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    load,
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
