import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import type { Bot, Bots } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useNodeStore } from 'stores/node-store';

const $notify = useNotifier();

const setup = () => {
  const $nodes = useNodeStore();

  const model = ref<Bots>([]);

  const Save = async (b: Bot): Promise<boolean | void> => (b.ID < 1 ? Create(b) : Update(b));

  const Create = async (b: Bot): Promise<boolean | void> => {
    return await api
      .post(`/bots`, b)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `🥳`, `Bot Created`))
      .catch($notify.err)
      .finally($nodes.Load);
  };

  const Update = async (b: Bot): Promise<boolean | void> => {
    return await api
      .put(`/bots`, b)
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `💾`, `Bot Updated`))
      .catch($notify.err)
      .finally($nodes.Load);
  };

  const Load = async (): Promise<Bots> => {
    await api
      .get<Bots>('/bots')
      .then((res: AxiosResponse<Bots>) => {
        model.value = res.status === 200 ? res.data : [];
        $notify.ok(res.data, `🤖`, `Bots loaded [${model.value.length}]`);
      })
      .catch($notify.err);
    return model.value;
  };

  const Delete = async (id: number): Promise<boolean> => {
    return await api
      .delete(`/bots/id/${id}`)
      .then(() => $notify.ok(null, `🗑️`, `Bot Deleted`))
      .catch($notify.err)
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
