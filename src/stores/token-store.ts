import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosError, type AxiosResponse } from 'boot/axios';
import { Loading, Notify } from 'quasar';
import { ref } from 'vue';
import { type NavigationFailure } from 'vue-router';

type thisType = ReturnType<typeof useTokenStore>;
type Token = string | undefined;

interface Auth {
  isAuthenticated: boolean;
  context: {
    token: Token;
    message?: string;
  };
}

const id = 'token-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};
const setup = () => {
  const token = ref<Token>();

  const login = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });

    return await api
      .post('/auth', {}, { auth })
      .then((res: AxiosResponse<Auth>): boolean => {
        token.value = res.data.context.token;
        api.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        Notify.create({
          timeout: 2000,
          position: 'bottom',
          message: '<div class="text-center">Welcome</div>',
          avatar: 'https://bytelyon-public.s3.amazonaws.com/logo-alt.png',
          html: true,
        });
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
        token.value = undefined;
        api.defaults.headers.common.Authorization = null;
        return false;
      })
      .finally(() => Loading.hide());
  };

  // Cannot be an arrow function give "this"
  async function logout(this: thisType): Promise<NavigationFailure | void | undefined> {
    token.value = undefined;
    api.defaults.headers.common.Authorization = null;
    return await this.router.push({ name: 'index' });
  }

  const authorized = (): boolean => !!token.value;

  return { token, authorized, login, logout };
};

export const useTokenStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
