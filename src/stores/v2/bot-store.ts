import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import type { Bot, Bots } from 'src/types/model';
import { useLogger } from 'src/composable/useLogger';
import useNotifier from 'src/composable/useNotifier';

const $log = useLogger();
const $notify = useNotifier();
const setup = () => {

  const model = ref<Bots>([]);
  interface error {
    error: string;
  }
  const Save = async (b: Bot): Promise<void> => {
    return await api
      .put(`/bots`, b)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `Bot ${b.CreatedAt > 0 ? 'Updated' : 'Created'}`))
      .then(Load)
      .catch((err: AxiosError<error>) => {
        $notify.err(err, 'Save Bot', err.response?.data?.error || '');
      });
  };

  const Load = async (): Promise<void> => {
    return await api
      .get<Bots>('/bots')
      .then((res: AxiosResponse<Bots>) => (model.value = res.status === 200 ? res.data : []))
      .then(() => $log.info(null, `Bots loaded [${model.value.length}]`))
      .catch((err: AxiosError) => $log.err(err, 'while loading Bots'));
  };

  const Delete = async (id: number): Promise<void> => {
    return await api
      .delete(`/bots/id/${id}`)
      .then(() => $notify.ok(null, `Bot Deleted`))
      .catch($log.err);
  }

  // const Find = (t: BotType, id?: string): Bots | Bot | undefined => {
  //   const bots:Bots = model.value.filter((b:Bot) => b.Type === t)
  //   if (id === undefined) return bots;
  //   return bots.find((b:Bot) => b.ID === id)
  // };

  return {
    Save,
    Load,
    Delete,
    // Find,
    model,
  };
};

export const useBotStore = defineStore('bot-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBotStore, import.meta.hot));
}
