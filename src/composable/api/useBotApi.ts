import { api } from 'src/boot/axios';
import type { Bot, Bots, BotType, Target } from 'src/types/bot';

const useBotApi = () => {
  return {
    delete: async (bt: BotType, t: Target) => await api.delete(`/bots?type=${bt}&target=${t}`),
    get: async (type: BotType) => await api.get<Bots>(`/bots?type=${type}`).then((r) => r.data),
    save: async (bot: Bot) => await api.put<Bot>(`/bots`, bot).then((r) => r.data),
  };
};

export default useBotApi;
