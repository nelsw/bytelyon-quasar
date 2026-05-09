import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api, type AxiosResponse } from 'src/boot/axios';
import { Map, type News } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

export const useNews = defineStore(
  'news',
  () => {
    const removing = ref(false);
    const loading = ref(false);

    const model = ref<Map<News[]>>(new Map<News[]>());

    const busy = computed(() => removing.value || loading.value);

    const Load = async (botId: string) => {
      loading.value = true;
      return await api
        .get<News[]>(`/news?botId=${botId}`)
        .then((r: AxiosResponse<News[]>) => model.value.set(botId, r.data))
        .catch($notify.err)
        .finally(() => (loading.value = false));
    };

    const Delete = async (botId: string, url: string) => {
      removing.value = true;
      await api
        .delete(`/news?botId=${botId}&url=${url}`)
        .then(() => model.value.get(botId, []).filter((r) => r.url !== url))
        .then((r) => model.value.set(botId, r))
        .then(() => $notify.OK(`Deleted News Article`))
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
