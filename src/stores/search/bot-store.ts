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
  const busy = ref(true);
  const model = ref<Bot[]>([]);

  const findIndex = (botId: string): number => model.value.findIndex(b => b.id === botId);

  const Load = async (): Promise<boolean> => {
    busy.value = true;
    return await api
      .get<Bot[]>(`/bots?type=search`)
      .then((r: AxiosResponse<Bot[]>) => model.value = r.data)
      .then(() => $notify.ok(model, `🤖`, `Search Bots Loaded`))
      .catch($notify.err)
      .finally(() => (busy.value = false));
  };

  const Retrieve = async (botId: string): Promise<Bot | undefined> => {
    busy.value = true;
    let res = model.value[findIndex(botId)];
    if (!res) await Load();
    res = model.value[findIndex(botId)];
    busy.value = false;
    return res;
  };

  const Create = async (
    target: string,
    blackList: string[],
    frequency: number,
  ): Promise<boolean> => {

    busy.value = true;

    const bot = await $botStore.Save({
      blackList: blackList,
      botId: '',
      frequency: frequency,
      id: '',
      target: target,
      type: BotType.Search,
      rows: [],
    });

    if (bot !== null) {
      model.value.push(bot);
    }

    busy.value = false;
    return true;
  };

  const Update = async (bot: Bot): Promise<boolean> => {
    busy.value = true;
    const b = await $botStore.Save({
      blackList: bot.blackList,
      botId: bot.id,
      frequency: bot.frequency,
      id: bot.id,
      target: bot.target,
      type: BotType.Search,
      rows: [],
    });
    busy.value = false;
    const ok = b !== null;

    if (ok) {
      const idx = findIndex(b.id)
      model.value.fill(b, idx, idx+1)
    }

    busy.value = false;

    return ok;
  };

  const Remove = async (target: string): Promise<boolean> => {
    busy.value = true;
    return await api
      .delete(`/bots/search?target=${target}`)
      .then(() => model.value = model.value.filter(b => b.target !== target))
      .then(() => $notify.ok(null, `🗑️`, `Search Bot Deleted`))
      .catch($notify.err)
      .finally(() => busy.value = false);
  };

  return {
    busy,
    model,
    Load,
    Create,
    Update,
    Remove,
    Retrieve,
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
