import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useBotStore } from 'stores/bot-store';

const $notify = useNotifier();
const $botStore = useBotStore();
const setup = () => {
  const loading = ref(true);
  const model = reactive(new Map<string, Bot>())

  const load = async (): Promise<boolean> => {
    loading.value = true;
    return await api
      .get<Bot[]>(`/bots?type=sitemap`)
      .then((r: AxiosResponse<Bot[]>) => r.data.forEach((b) => model.set(b.id, b)))
      .then(() => $notify.ok(model, `🤖`, `Sitemap Bots Loaded`))
      .catch($notify.err)
      .finally(() => (loading.value = false));
  };

  const create = async (
    target: string,
    frequency: number,
  ): Promise<boolean> => {
    loading.value = true;
    const bot = await $botStore.Save({
      blackList: [],
      botId: '',
      frequency: frequency,
      id: '',
      target: target,
      type: BotType.Sitemap,
      rows: [],
    });
    loading.value = false;
    if (bot === null) {
      return false;
    }
    model.set(bot.id, bot);
    return true;
  };

  const update = async (bot: Bot): Promise<boolean> => {
    loading.value = true;
    const b = await $botStore.Save({
      blackList: bot.blackList,
      botId: bot.id,
      frequency: bot.frequency,
      id: bot.id,
      target: bot.target,
      type: BotType.Sitemap,
      rows: [],
    });
    loading.value = false;
    return b !== null;
  };

  const remove = async (b: Bot): Promise<boolean> => {
    let encodedTarget = encodeURIComponent(b.target);
    encodedTarget = encodedTarget.replaceAll('.', ' ');
    return await api
      .delete(`/bots?type=sitemap&target=${encodedTarget}`)
      .then(() => model.delete(b.id))
      .then(() => $notify.ok(null, `🗑️`, `Sitemap Bot Deleted`))
      .catch($notify.err);
  };

  return {
    model,
    loading,
    load,
    create,
    update,
    remove,
  };
};

export const useSitemapBotStore = defineStore('sitemap-bot-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemapBotStore, import.meta.hot));
}
