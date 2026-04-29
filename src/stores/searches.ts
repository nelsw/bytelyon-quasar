import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { SearchBotData } from 'src/types/model';
import { Map } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';
import { Loading } from 'quasar';

const $notify = useNotifier();

export const useSearches = defineStore('searches', () => {
  const removing = ref(false);
  const loading = ref(false);
  const model = ref<Map<SearchBotData[]>>(new Map());

  const busy = computed(() => removing.value || loading.value);

  const Load = async (botId: string) => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .get<SearchBotData[]>(`/bots?type=search&id=${botId}`)
      .then((r: AxiosResponse<SearchBotData[]>) => model.value.set(botId, r.data))
      .catch($notify.err)
      .finally(Loading.hide);
  }

  const Delete = async (botId: string, id: string):Promise<boolean> => {
    removing.value = true;

    const results = model.value.get(botId, []);
    const target = results.find((r) => r.id === id)?.target as string;

    return await api
      .delete(`/bots?type=search&id=${id}&botId=${botId}`)
      .then(() => results.filter((r) => r.id !== id))
      .then((r) => model.value.set(botId, r))
      .then(() => $notify.OK(`Deleted ${target} Result`))
      .finally(() => (removing.value = false));
  };

  return {
    Load,
    Delete,
    model,
    busy
  }
}, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearches, import.meta.hot));
}
