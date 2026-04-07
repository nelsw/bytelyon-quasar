import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';

const $notify = useNotifier();

const setup = () => {
  const loading = ref(false);
  const bots = ref<Bot[]>([]);

  const load = async (): Promise<boolean> => {
    loading.value = true;
    return await api
      .get<Bot[]>(`/bots/search`)
      .then((result: AxiosResponse<Bot[]>) => (bots.value = result.data))
      .then(() => $notify.ok(bots.value, `🤖`, `Search Bots Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const create = async (
    target: string,
    blackList: string[],
    frequency: number,
  ): Promise<boolean> => {
    loading.value = true;
    return await api
      .post<Bot>(`/bots/search`, {
        type: BotType.News,
        frequency: frequency,
        target: target,
        blackList: blackList,
      })
      .then((res: AxiosResponse<Bot>) => {
        const arr = bots.value;
        arr.push(res.data);
        arr.sort((a: Bot, b: Bot) => a.target.localeCompare(b.target));
        bots.value = arr;
        return $notify.ok(res.data, `🤖`, `Search Bot Created`);
      })
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const find = (id: string): Bot | null =>
    bots.value.find((b: Bot) => b.id === id) ?? null;

  const update = async (bot: Bot): Promise<boolean> => {
    loading.value = true;
    return await api
      .post<Bot>(`/bots/search`, bot)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `🤖`, `Search Bot Created`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const remove = async (target: string): Promise<boolean> => {
    return await api
      .delete(`/bots/search?target=${target}`)
      .then(() => $notify.ok(null, `🗑️`, `Search Bot Deleted`))
      .catch($notify.err);
  };

  return {
    bots,
    loading,
    load,
    create,
    find,
    update,
    remove,
  };
};

export const useSearchBotStore = defineStore('search-bot-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchBotStore, import.meta.hot));
}
