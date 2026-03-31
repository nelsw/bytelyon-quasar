import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import type { Bot, BotNode, Err } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { useTokenStore } from 'stores/token-store';
import { useNodeStore } from 'stores/node-store';

const $notify = useNotifier();
const $tokenStore = useTokenStore();
const $nodeStore = useNodeStore();
const IsValidURL = (s:string) => {
  return new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i' // case-insensitive
  ).test(s);
}
const setup = () => {
  const Save = async (b: BotNode): Promise<BotNode | null> => {
    if (b.type === BotType.Sitemap) {
      b.target = `https://${b.target}`
      if (!IsValidURL(b.target)) {
        $notify.warn("Invalid URL");
        return null;
      }
    }
    return await api
      .put(`/bots?type=${b.type}`, {
        userID: $tokenStore.userID(),
        type: b.type,
        frequency: b.frequency,
        target: b.target,
        blackList: b.blackList,
      })
      .then((res: AxiosResponse<Bot>) => {
        const n:BotNode = $nodeStore.Insert(res.data)
        $notify.ok(n, `💾`, b.botId === '' ? 'Created' : 'Updated')
        return n
      })
      .catch((e:AxiosError<Err>)=> {
        $notify.err(e)
        return null;
      });
  };

  const Delete = async (node: BotNode): Promise<boolean> => {
    if (node.type === BotType.Sitemap) {
      node.target = encodeURIComponent(node.target)
      node.target = node.target.replaceAll(".", " ")
    }
    return await api
      .delete(`/bots?type=${node.type}&target=${node.target}`)
      .then(() => {
        $nodeStore.Remove(node)
        return $notify.ok(null, `🗑️`, `Bot Deleted`);
      })
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
