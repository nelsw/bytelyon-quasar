import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { SitemapNode } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = ref<SitemapNode[]>([]);
  const load = async (domain: string): Promise<boolean> => {
    loading.value = true;
    return await api
      .get<SitemapNode>(`/sitemaps?domain=${domain}`)
      .then((r: AxiosResponse<SitemapNode>) => model.value.push(r.data))
      .then(() => $notify.ok(model.value, `🤖`, `Sitemap Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    load,
  };
};

export const useSitemapBotResultsStore = defineStore('sitemap-bot-results-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemapBotResultsStore, import.meta.hot));
}
