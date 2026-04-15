import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { SitemapNode } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useSitemapBotStore } from 'stores/sitemap/bot-store';

const $notify = useNotifier();
const $bots = useSitemapBotStore();
const setup = () => {
  const loading = ref(true);
  const botId = ref('');
  const model = ref<SitemapNode[]>([]);

  const find = (botId: string):SitemapNode|undefined => model.value[findIndex(botId)]

  const findIndex = (botId: string): number => model.value.findIndex(b => b.botId === botId);

  const load = async (id: string, force?: boolean) => {
    botId.value = id;
    const node = find(id)
    if (node && !force) return node;
    loading.value = true;

    const domain = (await $bots.Retrieve(id))?.target

    return await api
      .get<SitemapNode>(`/sitemaps?domain=${domain}`)
      .then((r: AxiosResponse<SitemapNode>) => {
        const n = r.data
        n.botId = id;
        const idx = findIndex(id)
        if (idx > -1) {
          model.value.fill(n, idx, idx+1);
        } else {
          model.value.push(n);
        }
      })
      .then(() => $notify.ok(null, `🤖`, `Sitemap Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    find,
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
