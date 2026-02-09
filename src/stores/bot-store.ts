import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import type { Bot, Bots } from 'src/types/model';
import { useLogger } from 'src/composable/useLogger';
import useNotifier from 'src/composable/useNotifier';
import { useNodeStore } from 'stores/node-store';

const $log = useLogger();
const $notify = useNotifier();

const setup = () => {
  const $nodes = useNodeStore();

  const model = ref<Bots>([]);

  const Save = async (b: Bot): Promise<void> => {
    return await api
      .put(`/bots`, b)
      .then((res: AxiosResponse<Bot>) =>
        $notify.ok(res.data, `Bot ${b.CreatedAt > 0 ? 'Updated' : 'Created'}`),
      )
      .catch((err: AxiosError<{ error: string }>) => {
        $notify.err(err, '$bots', err.response?.data?.error || '');
      })
      .finally($nodes.Load);
  };

  const Load = async (): Promise<Bots> => {
    await api
      .get<Bots>('/bots')
      .then((res: AxiosResponse<Bots>) => (model.value = res.status === 200 ? res.data : []))
      .then(() => $log.info(null, `Bots loaded [${model.value.length}]`))
      .catch((err: AxiosError) => $log.err(err, 'while loading Bots'));
    return model.value;
  };

  const Delete = async (id: number): Promise<void> => {
    return await api
      .delete(`/bots/id/${id}`)
      .then(() => $notify.ok(null, `Bot Deleted`))
      .catch($log.err)
      .finally($nodes.Load);
  };

  return {
    Save,
    Load,
    Delete,
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
