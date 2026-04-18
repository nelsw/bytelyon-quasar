import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { Model, type Page } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = ref<Model<string, Page[]>>(new Model());

  const load = async (url: string): Promise<boolean> => {
    loading.value = true;
    return api
      .get(`/pages?url=${url}`)
      .then((r: AxiosResponse<Page[]>) => model.value.set(url, r.data))
      .then((p: Page[]) => $notify.ok(p, `🤖`, `${p.length} Pages Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    load,
  };
};

export const usePageStore = defineStore('page-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot));
}
