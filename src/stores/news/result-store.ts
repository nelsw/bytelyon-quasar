import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { NewsBotResult } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import type { AxiosError } from 'axios';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(true);
  const model = reactive(new Map<string, NewsBotResult[]>());

  const load = async (botId:string): Promise<boolean> => {
    console.debug('Loading bot results');
    return await api
      .get<NewsBotResult[]>(`/bots?type=news&id=${botId}`)
      .then((r: AxiosResponse<NewsBotResult[]>) => model.set(botId, r.data))
      .then((m) => $notify.ok(m.get(botId), `🤖`, `News Bot Results Loaded`))
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
      .then(() => model.set(botId, model.get(botId)?.filter((b) => b.id != id) ?? []))
      .then(() => true)
      .catch((e: AxiosError) => {
        console.error(e);
        return false;
      });
  }

  return {
    model,
    loading,
    load,
    remove,
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
