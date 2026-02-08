import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import type { Bot, Bots, BotType } from 'src/types/model';
import { useLogger } from 'src/composable/useLogger';
import useNotifier from 'src/composable/useNotifier';

const id = 'bot-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};

const $log = useLogger();
const $notify = useNotifier();
const setup = () => {

  const model = ref<Bot[]>([]);

  const Save = async (b: Bot): Promise<void> => {
    return await api
      .put(`/bots`, b)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `Bot ${b.ID > 0 ? 'Updated' : 'Created'}`))
      .then(Load)
      .catch((err: AxiosError) => $notify.err(err, 'Save Bot '));
  };

  const Load = async (t?: BotType|void): Promise<void> => {

    let url: string = '/bots';
    if (t !== undefined) {
      url += `/type/${t}`;
    }

    return await api
      .get<Bot[]>(url)
      .then((res: AxiosResponse<Bot[]>) => model.value = res.status === 200 ? res.data : [])
      .then(() => $log.info(null, `Bots loaded [${model.value.length}]`))
      .catch((err: AxiosError) => $log.err(err, 'while loading Bots'));
  };

  const Delete = async (id: number): Promise<void> => {
    return await api
      .delete(`/bots/${id}`)
      .then(() => $notify.ok(null, `Bot Deleted`))
      .catch((err: AxiosError) => $notify.err(err, `Delete Bot ${id}`));
  }

  const Find = (t: BotType, id?: number): Bots | Bot | undefined => {
    const bots:Bots = model.value.filter((b:Bot) => b.Type === t)
    if (id === undefined || id < 1) return bots;
    return bots.find((b:Bot) => b.ID === id)
  };

  return {
    Save,
    Load,
    Delete,
    Find,
    model,
  };
};

export const useBotStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBotStore, import.meta.hot));
}
