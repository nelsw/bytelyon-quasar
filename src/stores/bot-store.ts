import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot, BotNode} from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';
import { useNodeStore } from 'stores/node-store';

const $notify = useNotifier();
const $tokenStore = useTokenStore();
const $nodeStore = useNodeStore();

const setup = () => {
  const Save = async (b: BotNode): Promise<boolean> => {
    return await api
      .put(`/bots?type=${b.type}`, {
        userID: $tokenStore.userID(),
        type: b.type,
        frequency: b.frequency,
        target: b.target,
        blackList: b.blackList,
      })
      .then((res: AxiosResponse<Bot>) => $nodeStore.Insert(res.data))
      .then((node:BotNode) => $notify.ok(node, `💾`, b.botId === '' ? 'Created' : 'Updated'))
      .catch($notify.err);
  };

  const Delete = async (type: BotType, target: string): Promise<boolean> => {
    if (type === BotType.Sitemap) {
      target = encodeURIComponent(target)
    }
    return await api
      .delete(`/bots?type=${type}&target=${target}`)
      .then(() => $notify.ok(null, `🗑️`, `Bot Deleted`))
      .catch($notify.err);
  };

  return {
    Save,
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
