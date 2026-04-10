import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot, NewsBotResult, NewsBotResultGroup } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import type { AxiosError } from 'axios';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = ref<NewsBotResultGroup[]>([]);

  const load = async (botId:string): Promise<boolean> => {
    loading.value = true;
    if (model.value.find(g => g.botId === botId)) {
      loading.value = false;
      return true;
    }
    return await api
      .get<NewsBotResult[]>(`/bots?type=news&id=${botId}`)
      .then((r: AxiosResponse<NewsBotResult[]>) => ({botId:botId, results: r.data}))
      .then((g:NewsBotResultGroup)=> {
        const groups = model.value.filter(g => g.botId !== botId)
        groups.push(g)
        model.value = groups
        return g;
      })
      .then((g:NewsBotResultGroup) => $notify.ok(g, `🤖`, `News Bot Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const remove = async (...results:NewsBotResult[]): Promise<boolean> => {
    let ok: number = 0;
    for (let i = 0; i < results.length; i++) {
      const r = results[i] as NewsBotResult;
      if (await doRemove(r.botId, r.id)) {
        ok++;
      }
    }
    if (ok === results.length) {
      return $notify.ok(null, `🤖`, `News Bot Results Deleted`);
    }
    return $notify.warn(`Failed to delete all News Bot Results; Refresh now.`);
  }

  const doRemove = async (botId: string, id: string): Promise<boolean> => {
    return await api
      .delete(`/bots?type=news&botId=${botId}&id=${id}`)
      .then(() => {
        const group = model.value.find((g) => g.botId === botId);
        if (group) {

          group.results = group?.results.filter((r) => r.id !== id);
          const groups = model.value.filter((g) => g.botId !== botId);
          groups.push(group);
          model.value = groups;
        }
      })
      .then(() => true)
      .catch((e: AxiosError) => {
        console.error(e);
        return false;
      });
  }

  const rows =  (bot: Bot | undefined): NewsBotResult[] => {
    return model.value.find((g) => g.botId === bot?.id)?.results || ([]);
  };

  return {
    model,
    loading,
    load,
    remove,
    rows,
  };
};

export const useNewsBotResultsStore = defineStore('news-bot-results-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsBotResultsStore, import.meta.hot));
}
