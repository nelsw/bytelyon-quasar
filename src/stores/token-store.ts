import { defineStore, acceptHMRUpdate } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosError, type AxiosResponse } from 'boot/axios';

interface State {
  token: string | null;
}

export const useTokenStore = defineStore('token-store', {
  state: (): State => ({
    token: null,
  }),

  getters: {
    authorized: (state: State) => state.token !== null,
    authorization: (state: State): string => `Bearer ${state.token}`,
  },

  actions: {
    async authorize(auth: AxiosBasicCredentials): Promise<boolean> {
      return await api
        .post(process.env.API_LOGIN, {}, { auth })
        .then((response: AxiosResponse<State>): boolean => {
          this.token = response.data.token;
          return true;
        })
        .catch((error: AxiosError): boolean => {
          console.error(error);
          this.token = null;
          return false;
        });
    },
  },

  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
