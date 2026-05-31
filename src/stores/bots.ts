import { defineStore } from 'pinia';
import type { Bot, Bots, BotType, Target } from 'src/types/bot';
import { New } from 'src/types/bot';
import { Validate } from 'src/types/bot';
import { computed, ref } from 'vue';
import useBotApi from 'src/composable/api/useBotApi';
import useNotifier from 'src/composable/useNotifier';
import { format } from 'quasar';
import capitalize = format.capitalize;

type Model = Record<BotType, Bots>;

const $api = useBotApi();
const $notify = useNotifier();

export const useBotStore = defineStore('bots', () => {
  const model = ref<Model>({} as Model);
  const save = async (bot: Bot, create :boolean) => {
    console.debug('saving...', bot);
    const v = Validate(bot);
    if (v.length > 0) {
      $notify.warn(v);
      return;
    }

    const msg = `${capitalize(bot.type)} Bot ${create ? 'Created' : 'Updated'}`;
    try {
      const bots = model.value[bot.type].filter((b) => b.target !== bot.target);
      bots.push(await $api.save(bot));
      model.value[bot.type] = bots.sort((a, b) => a.target.localeCompare(b.target));
      return $notify.Icon(msg, 'mdi-content-save', create ? 'green-13' : 'amber-13');
    } catch (e) {
      return e;
    }
  };
  return {
    model,
    newsBots: computed(() => model.value['news'] as Bots),
    searchBots: computed(() => model.value['search'] as Bots),
    sitemapBots: computed(() => model.value['sitemap'] as Bots),
    create: async (bot: Bot) => save(bot, true),
    delete: async (type: BotType, target: Target) => {
      try {
        const idx = model.value[type].findIndex((b) => b.target === target);
        if (idx === -1) return;
        await $api.delete(type, target);
        model.value[type].splice(idx, 1);
        return $notify.Icon(`${capitalize(type)} Bot Deleted`, 'mdi-delete', 'pink-13');
      } catch (e) {
        return e;
      }
    },
    fetch: async () => {
      try {
        const [newsBots, searchBots, sitemapBots] = await Promise.all([
          $api.get('news'),
          $api.get('search'),
          $api.get('sitemap'),
        ]);
        model.value['news'] = newsBots.sort((a, b) => a.target.localeCompare(b.target));
        model.value['search'] = searchBots.sort((a, b) => a.target.localeCompare(b.target));
        model.value['sitemap'] = sitemapBots.sort((a, b) => a.target.localeCompare(b.target));
      } catch (e) {
        console.error(e);
        return e;
      }
    },
    get: (type: BotType, target?: Target): Bot =>
      model.value[type]?.find((b) => b.target === target) ?? New(type, target),
    update: async (bot: Bot) => save(bot, false),
  };
});
