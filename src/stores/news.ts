import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api, type AxiosResponse } from 'src/boot/axios';
import { Map, type NewsBotResult } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

export const useNews = defineStore(
  'news',
  () => {
    const removing = ref(false);
    const loading = ref(false);

    const model = ref<Map<NewsBotResult[]>>(new Map<NewsBotResult[]>());

    const busy = computed(() => removing.value || loading.value);

    const Load = async (botId: string, force?: boolean) => {
      if (model.value.get(botId, []).length > 0 && !force) {
        return;
      }

      loading.value = true;
      return await api
        .get<NewsBotResult[]>(`/bots?type=news&id=${botId}`)
        .then((r: AxiosResponse<NewsBotResult[]>) => model.value.set(botId, r.data))
        .catch($notify.err)
        .finally(() => (loading.value = false));
    };

    const Delete = async (botId: string, id: string) => {
      removing.value = true;

      const results = model.value.get(botId, []);
      const target = results.find((r) => r.id === id)?.target as string;

      await api
        .delete(`/bots?type=news&id=${id}&botId=${botId}`)
        .then(() => results.filter((r) => r.id !== id))
        .then(r => model.value.set(botId, r))
        .then(() => $notify.OK(`Deleted ${target} Result`))
        .finally(() => (removing.value = false));
    };

    return {
      model,
      busy,
      Load,
      Delete
    };
  },
  {
    persist: {
      debug: true,
      storage: sessionStorage
    }
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNews, import.meta.hot));
}
