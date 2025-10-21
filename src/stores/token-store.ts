import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosError, type AxiosResponse } from 'boot/axios';
import { Loading, Notify } from 'quasar';
import { ref } from 'vue';
import { type NavigationFailure } from 'vue-router';


export const useTokenStore = defineStore(
  'token-store',
  () => {

    const token = ref<string | null>(null);

    const login = async (auth: AxiosBasicCredentials): Promise<boolean> => {
      Loading.show({ spinnerColor: 'primary' });
      return await api
        .post(process.env.API_LOGIN, {}, { auth })
        .then((res: AxiosResponse<{ token: string | null }>): boolean => {
          token.value = res.data.token;
          api.defaults.headers.common.Authorization = `Bearer ${token.value}`;
          return true;
        })
        .catch((err: AxiosError): boolean => {
          console.error(err);
          Notify.create({
            color: 'negative',
            textColor: 'white',
            icon: 'mdi-alert-circle-outline',
            message: 'Login failed; Check your credentials and try again.',
            position: 'top',
          });
          token.value = null;
          api.defaults.headers.common.Authorization = null;
          return false;
        })
        .finally(() => {
          Loading.hide();
        });
    };

    async function logout(this: ReturnType<typeof useTokenStore>): Promise<NavigationFailure | void | undefined> {
      token.value = null;
      api.defaults.headers.common.Authorization = null;
      return await this.router.push({ name: 'index' });
    }

    const authorized = (): boolean => !!token.value;

    return { token, authorized, login, logout };
  },
  {
    persist: {
      debug: true,
      storage: sessionStorage,
    },
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
