import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { SitemapBotResultGroup } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const resultGroups = ref<SitemapBotResultGroup[]>([]);

  const find = (botId: string): SitemapBotResultGroup | null =>
    resultGroups.value.find((entry) => entry.botId === botId) ?? null;

  const load = async (botId: string): Promise<boolean> => {
    loading.value = true;
    return await api
      .get<SitemapBotResultGroup>(`/bots?type=sitemap&id=${botId}`)
      .then((r: AxiosResponse<SitemapBotResultGroup>) => {
        console.debug(JSON.stringify(r, null, 2));
        const groups: SitemapBotResultGroup[] = resultGroups.value.filter(
          (rg: SitemapBotResultGroup) => rg.botId !== botId,
        );
        groups.push(r.data);
        resultGroups.value = groups;
        return r.data;
      })
      .then((r: SitemapBotResultGroup) => $notify.ok(r, `🤖`, `Sitemap Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const get = async (botId: string): Promise<SitemapBotResultGroup | null> => {
    if (find(botId) === null) await load(botId);
    return resultGroups.value.find((r) => r.botId === botId) ?? null;
  };

  return {
    loading,
    resultGroups,
    load,
    get,
    find,
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
