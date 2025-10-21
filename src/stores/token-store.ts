import { defineStore, acceptHMRUpdate } from 'pinia';
import {
  api,
  type AxiosBasicCredentials,
  type AxiosError,
  type AxiosResponse,
} from 'boot/axios';

interface Data {
  token: string | null;
}

export const useTokenStore = defineStore('token-store', {

  state: (): Data => ({
    token: null,
  }),

  getters: {
    authorized: (state: Data): boolean => !!state.token,
  },

  actions: {

    async authorize(auth: AxiosBasicCredentials): Promise<boolean> {
      return await api
        .post(process.env.API_LOGIN, {}, { auth })
        .then((res: AxiosResponse<Data>): boolean => {
          this.token = res.data.token;
          api.defaults.headers.common.Authorization = `Bearer ${this.token}`;
          return true;
        })
        .catch((err: AxiosError): boolean => {
          console.error(err);
          this.token = null;
          return false;
        }).finally((): void => {

        });
    },

    async logout(): Promise<void> {
      return Promise.try(() => {
        this.token = null;
        api.defaults.headers.common.Authorization = null;
      });
    },
  },

  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
