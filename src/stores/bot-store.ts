import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import type { Bot, BotNode, Err} from 'src/types/model';
import { Model } from 'src/types/model';
import { BotType } from 'src/types/model';
import useNotifier from 'src/composable/useNotifier';
import { ref } from 'vue';

const $notify = useNotifier();
const IsValidDomain = (s: string) => {
  return new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i', // case-insensitive
  ).test(s);
};
const setup = () => {
  const busy = ref(false);
  const model = ref<Model<BotType, Model<string, Bot>>>(new Model());

  const Save = async (b: BotNode): Promise<Bot | null> => {
    console.info('save bot', b);

    const isNew = b.botId === '' && b.id === '';

    if (
      b.id === BotType.News.toString() ||
      b.id === BotType.Search.toString() ||
      b.id === BotType.Sitemap.toString()
    ) {
      b.id = '';
    }

    if (b.botId === '' && b.type === BotType.Sitemap) {
      if (!IsValidDomain(b.target)) {
        $notify.warn('Invalid URL');
        return null;
      }
    }
    return await api
      .put(`/bots?type=${b.type}`, {
        type: b.type,
        frequency: b.frequency,
        target: b.target,
        blackList: b.blackList,
        botId: b.botId,
        id: b.id,
      })
      .then((res: AxiosResponse<Bot>) => {
        $notify.ok(res.data, `💾`, isNew ? 'Created' : 'Updated');
        return res.data;
      })
      .catch((e: AxiosError<Err>) => {
        $notify.err(e);
        return null;
      });
  };

  const remove = async (b: Bot) => {
    let target = b.target;
    if (b.type === BotType.Sitemap) {
      target = encodeURIComponent(target).replaceAll('.', ' ');
    }
    busy.value = true;
    return await api
      .delete(`/bots?type=${b.type}&target=${target}`)
      .then(() => model.value.get(b.type)?.remove(b.id))
      .then(() => $notify.ok(null, `🗑️`, `Bot Deleted`))
      .catch($notify.err)
      .finally(() => busy.value = false);
  }

  const Delete = async (node: BotNode): Promise<boolean> => {
    if (node.type === BotType.Sitemap) {
      node.target = encodeURIComponent(node.target);
      node.target = node.target.replaceAll('.', ' ');
    }
    return await api
      .delete(`/bots?type=${node.type}&target=${node.target}`)
      .then(() => {
        return $notify.ok(null, `🗑️`, `Bot Deleted`);
      })
      .catch($notify.err);
  };

  const load = async (botType: BotType) => {
    busy.value = true;
    return await api
      .get<Bot[]>(`/bots?type=${botType}`)
      .then((r: AxiosResponse<Bot[]>) => r.data)
      .then((arr) => arr.map((b) => ({ k: b.id, v: b })))
      .then(entries => new Model(entries))
      .then((m) => model.value.set(botType, m))
      .catch($notify.err)
      .finally(() => (busy.value = false));
  };

  const save = async (b: Bot) => {
    console.info('save bot', JSON.stringify(b, null, 2));

    if (b.id==='' && b.type === BotType.Sitemap && !IsValidDomain(b.target)) {
      $notify.warn('Invalid Domain');
      return false;
    }

    busy.value = true;
    return await api
      .put(`/bots?type=${b.type}`, b)
      .then((res: AxiosResponse<Bot>) => res.data)
      .then((b) => {
        model.value.get(b.type)?.set(b.id, b);
        $notify.ok(null, `💾`, b.id === '' ? 'Created' : 'Updated')
        return model.value.get(b.type)?.get(b.id) as Bot;
      })
      .catch($notify.err)
      .finally(() => (busy.value = false));
  };

  return {
    busy,
    model,
    remove,
    load,
    save,
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
