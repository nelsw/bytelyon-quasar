import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useBotStore } from 'stores/bot-store';

const $notify = useNotifier();
const $botStore = useBotStore();

const setup = () => {
  const loading = ref(false);
  const bots = ref<Bot[]>([]);

  const load = async (): Promise<boolean> => {
    loading.value = true;
    return await api
      .get<Bot[]>(`/bots?type=search`)
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
    const bot = await $botStore.Save({
      blackList: blackList,
      botId: '',
      frequency: frequency,
      id: '',
      target: target,
      type: BotType.Search,
      rows: [],
    });
    loading.value = false;
    if (bot === null) {
      return false;
    }
    const arr = bots.value;
    arr.push(bot);
    arr.sort((a: Bot, b: Bot) => a.target.localeCompare(b.target));
    bots.value = arr;
    return true;
  };

  const find = (id: string): Bot | null =>
    bots.value.find((b: Bot) => b.id === id) ?? null;

  const update = async (bot: Bot): Promise<boolean> => {
    loading.value = true;
    const b = await $botStore.Save({
      blackList: bot.blackList,
      botId: bot.id,
      frequency: bot.frequency,
      id: bot.id,
      target: bot.target,
      type: BotType.Search,
      rows: [],
    });
    loading.value = false;
    return b !== null;
  };

  const remove = async (target: string): Promise<boolean> => {
    return await api
      .delete(`/bots/search?target=${target}`)
      .then(() => (bots.value = bots.value.filter((b: Bot) => b.target !== target)))
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
