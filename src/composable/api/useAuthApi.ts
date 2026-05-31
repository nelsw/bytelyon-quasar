import { api } from 'src/boot/axios';
import { type Authorization } from 'src/types/authorization';
import type { AxiosBasicCredentials } from 'boot/axios';

const useBotApi = () => {
  return {
    post: async (auth: AxiosBasicCredentials) =>
      await api.post<Authorization>(`/auth`, {}, { auth }).then((r) => r.data),
  };
};

export default useBotApi;
