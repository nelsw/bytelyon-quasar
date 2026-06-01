import { api } from 'src/boot/axios';
import { type Authorization } from 'src/types/authorization';
import type { AxiosBasicCredentials } from 'boot/axios';

const u = '/auth'

const useBotApi = () => {
  return {
    post: async (auth: AxiosBasicCredentials) =>
      await api.post<Authorization>(u, {}, { auth }).then((r) => r.data),
  };
};

export default useBotApi;
