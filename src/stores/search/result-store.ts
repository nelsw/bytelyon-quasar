import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {  type SearchBotData } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const removing = ref(false);
  const loading = ref(false);
  const model = ref<SearchBotData[][]>([]);
  const botId = ref<string>('')
  const resultId = ref<string>('');

  const busy = computed(() => removing.value || loading.value);
  const selection = computed(() => find(botId.value).find(r => r.id === resultId.value))

  const findIndex = (botId: string): number => model.value.findIndex(a => a?.[0]?.botId === botId);

  const find = (botId: string): SearchBotData[] => loading.value ? [] : model.value[findIndex(botId)] ?? []

  const load = async (id: string, force?:boolean) => {
    botId.value = id;
    const results = find(id)
    if (results.length > 0) {
      resultId.value = results[0]?.id ?? ''
      if (force !== true) return;
    }

    loading.value = true;
    return await api
      .get<SearchBotData[]>(`/bots?type=search&id=${id}`)
      .then((r: AxiosResponse<SearchBotData[]>) => {
        const idx = findIndex(id);
        if (idx > 0) {
          model.value[idx] = r.data ?? [];
        } else {
          model.value.push(r.data ?? []);
        }
        if ((r.data ?? []).length > 0) {
          resultId.value = r.data[0]?.id ?? ''
        }
      })
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const remove = async (botId: string, id:string) => {
    removing.value = true;
    return await api
      .delete(`/bots?type=search&botId=${botId}&id=${id}`)
      .then(() => {
        const idx = findIndex(botId);
        if (model.value[idx]) {
          model.value[idx] = model.value[idx].filter((v) => v.id !== id);
        }
      })
      .then(() => $notify.ok(null, `🤖`, `Search Bot Result Deleted`))
      .catch($notify.err)
      .finally(() => (removing.value = false));
  }

  return {
    busy,
    selection,
    resultId,
    model,
    load,
    find,
    remove,
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
