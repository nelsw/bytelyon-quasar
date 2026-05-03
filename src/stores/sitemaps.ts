import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import  { type Sitemap, Map } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

export const useSitemaps = defineStore('sitemaps', () => {
  const loading = ref(false);
  const model = ref<Map<Sitemap>>(new Map());

  const Load = async (domain:string) => {
    return await api
      .get<Sitemap>(`/sitemaps?domain=${domain}`)
      .then((r: AxiosResponse<Sitemap>) => model.value.set(domain, r.data))
      .then(() => $notify.ok(null, `🤖`, `Sitemap Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    Load,
  };
}, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemaps, import.meta.hot));
}
