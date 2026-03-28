import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosResponse } from 'boot/axios';
import type { Bot, BotNode } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';
import { base64 } from 'src/types/base';

const $notify = useNotifier();
const $tokenStore = useTokenStore();
const setup = () => {
  const Save = async (b: BotNode): Promise<boolean | void> => {
    return await api
      .put(`/bots?type=${b.type}`, {
        userID: $tokenStore.userID(),
        type: b.type,
        frequency: b.frequency,
        target: b.target,
        blackList: b.blackList,
      })
      .then((res: AxiosResponse<Bot>) => $notify.ok(res.data, `💾`, b.botId === '' ? 'Created' : 'Updated'))
      .catch($notify.err);
  };

  const Delete = async (type: BotType, target: string): Promise<boolean> => {
    if (type === BotType.Sitemap) {
      target = base64(target);
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
