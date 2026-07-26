import { api } from 'src/boot/axios';
import { type Auth } from 'src/types/auth';
import { type AxiosBasicCredentials } from 'axios';

const u = '/auth';

const useBotApi = () => {
  return {
    post: async (auth:AxiosBasicCredentials) =>
      await api.post<Auth>(u, {}, { auth }).then((r) => r.data),
  };
};

export default useBotApi;
