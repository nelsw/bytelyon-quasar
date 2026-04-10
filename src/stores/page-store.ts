import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import type { Page, PageGroup } from 'src/types/model';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = ref<PageGroup[]>([]);
  const load = async (url: string): Promise<boolean> => {
    if (model.value.find(p => p.url === url)) return true;
    loading.value = true;
    return api
      .get(`/pages?url=${url}`)
      .then((r: AxiosResponse<Page[]>) => ({ url: url, pages: r.data }))
      .then((g: PageGroup) => model.value.push(g))
      .then(() => $notify.ok(model.value, `🤖`, `Pages Loaded`))
      .catch($notify.err)
      .finally(() => loading.value = false);
  };

  return {
    loading,
    model,
    load,
  }
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
