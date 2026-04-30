import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { SitemapNode } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(false);
  const model = ref<SitemapNode[]>([]);

  const Load = async (domain:string) => {
    return await api
      .get<SitemapNode>(`/sitemaps?domain=${domain}`)
      .then((r: AxiosResponse<SitemapNode>) => {
        const idx = model.value.findIndex(n => n.label === domain);
        if (idx > -1) {
          model.value.splice(idx, 1);
        }
        model.value.push(r.data);
      })
      .then(() => $notify.ok(null, `🤖`, `Sitemap Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    Load,
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
