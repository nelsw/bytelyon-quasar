import { acceptHMRUpdate, defineStore } from 'pinia';
import { type Bot, BotType } from 'src/types/model';
import { Map } from 'src/types/model';
import { ref } from 'vue';
import { api, type AxiosResponse } from 'boot/axios';
import useNotifier from 'src/composable/useNotifier';

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
export const useBots = defineStore(
  'bots',
  () => {
    const busy = ref(true);

    const model = ref<Map<Bot[]>>(new Map());

    const Load = async (botType: BotType) => {
      busy.value = true;
      return await api
        .get<Bot[]>(`/bots?type=${botType}`)
        .then((r: AxiosResponse<Bot[]>) => model.value.set(botType, r.data))
        .catch($notify.err)
        .finally(() => (busy.value = false));
    };

    const Delete = async (botType: BotType, botId: string) => {
      busy.value = true;
      let target = model.value.get(botType, []).find((i) => i.id === botId)?.target as string;
      if (botType === BotType.Sitemap) {
        target = encodeURIComponent(target).replaceAll('.', ' ');
      }
      return await api
        .delete(`/bots?type=${botType}&target=${target}`)
        .then(() => model.value.get(botType, []).filter((i) => i.id !== botId))
        .then((bots) => model.value.set(botType, bots))
        .then(() => $notify.ok(null, `🗑️`, `Bot Deleted`))
        .catch($notify.err)
        .finally(() => (busy.value = false));
    };

    const Save = async (
      type: BotType,
      id: string,
      target: string,
      frequency: number,
      blackList: string[],
    ) => {
      busy.value = true;

      if (id === '' && type === BotType.Sitemap && !IsValidDomain(target)) {
        $notify.warn('Invalid Domain');
        return false;
      }

      return await api
        .put(`/bots?type=${type}`, { id, type, target, frequency, blackList })
        .then((r: AxiosResponse<Bot>) => r.data)
        .then((bot: Bot) => {
          const bots = model.value.get(type, []);
          const idx = bots.findIndex((b) => b.id === id)
          if (idx > -1) {
            bots.splice(idx, 1);
          }
          bots.push(bot);
          model.value.set(type, bots);
          $notify.ok(null, `💾`, id === '' ? 'Created' : 'Updated');
          return bot;
        })
        .catch($notify.err)
        .finally(() => (busy.value = false));
    };

    return {
      Delete,
      Load,
      Save,
      busy,
      model,
    };
  },
  {
    persist: {
      debug: true,
      storage: sessionStorage,
    },
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBots, import.meta.hot));
}
