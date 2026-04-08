import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot, NewsBotResult, NewsBotResultGroup } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useNewsBotStore } from 'stores/news/bot-store';
import type { AxiosError } from 'axios';

const $store = useNewsBotStore();
const $notify = useNotifier();

const setup = () => {
  const loading = ref(false);
  const resultGroups = ref<NewsBotResultGroup[]>([]);
  const results = ref<NewsBotResult[]>([]);

  const find = (botId: string): NewsBotResultGroup | null =>
    resultGroups.value.find((entry) => entry.botId === botId) ?? null;

  const load = async (botId:string): Promise<boolean> => {
    const bot: Bot|null = $store.find(botId);
    if (bot === null) {
      $notify.warn("Bot not found");
      return false;
    }
    loading.value = true;
    return await api
      .get<NewsBotResult[]>(`/bots/news/results?id=${botId}`)
      .then((r: AxiosResponse<NewsBotResult[]>) => set(botId, bot.target, r.data))
      .then((r: NewsBotResultGroup) => $notify.ok(r, `🤖`, `News Bot Results Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const set = (botId: string, target:string, results: NewsBotResult[]): NewsBotResultGroup => {

    const group:NewsBotResultGroup = {
      botId: botId,
      target: target,
      results: results,
    };

    if (results.length === 0) return group

    const groups = resultGroups.value.filter((entry) => entry.botId !== botId);
    groups.push(group);
    resultGroups.value = groups;
    return group;
  };

  const get = async (botId: string): Promise<NewsBotResultGroup | null> => {
    if (find(botId) === null) await load(botId);
    return resultGroups.value.find((entry) => entry.botId === botId) ?? null;
  };

  const update = async (bot: Bot): Promise<boolean> => {
    loading.value = true;
    return await api
      .post<Bot>(`/bots/news/results`, bot)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `🤖`, `News Bot Created`))
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
      .delete(`/bots/news/results?botId=${botId}&id=${id}`)
      .then(() => true)
      .catch((e: AxiosError) => {
        console.error(e);
        return false;
      });
  }

  return {
    results,
    loading,
    load,
    update,
    get,
    remove,
    find,
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
