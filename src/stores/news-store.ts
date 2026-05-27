import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api, type AxiosResponse } from 'src/boot/axios';
import { Map } from 'src/types/model';
import { type Headline } from 'src/types/headline';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const removing = ref(false);
  const loading = ref(false);

  const model = ref<Map<Headline[]>>(new Map<Headline[]>());

  const busy = computed(() => removing.value || loading.value);

  const Load = async (topic: string) => {
    loading.value = true;
    return await api
      .get<Headline[]>(`/news?topic=${topic}`)
      .then((r: AxiosResponse<Headline[]>) => model.value.set(topic, r.data))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const Delete = async (topic: string, url: string) => {
    removing.value = true;
    await api
      .delete(`/news?topic=${topic}&url=${url}`)
      .then(() => model.value.get(topic, []).filter((r) => r.url !== url))
      .then((r) => model.value.set(topic, r))
      .then(() => $notify.OK(`Deleted News Article`))
      .finally(() => (removing.value = false));
  };

  return {
    model,
    busy,
    Load,
    Delete,
  };
};

export const useNewsStore = defineStore('news-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsStore, import.meta.hot));
}
