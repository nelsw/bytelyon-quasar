import { api } from 'src/boot/axios';
import type { Bot, Bots, BotType, Target } from 'src/types/bot';

const u = '/bots';

const useBotApi = () => {
  return {
    delete: async (type: BotType, target: Target) =>
      await api.delete(u, { params: { type, target } }),
    get: async (type: BotType) =>
      await api.get<Bots | null>(u, { params: { type } }).then((r) => r.data ?? []),
    save: async (bot: Bot) => await api.put<Bot>(u, bot).then((r) => r.data),
  };
};

export default useBotApi;
