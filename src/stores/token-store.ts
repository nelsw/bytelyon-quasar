import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosResponse } from 'boot/axios';
import { Loading } from 'quasar';
import { ref } from 'vue';
import { type NavigationFailure } from 'vue-router';
import useNotifier from 'src/composable/useNotifier';
import type { Email } from 'src/types/model';
import { useLogger } from 'src/composable/useLogger';

type thisType = ReturnType<typeof useTokenStore>;
type Token = string | null;

interface Auth {
  isAuthenticated: boolean;
  context: {
    token: Token;
    message?: string;
  };
}
const $log = useLogger();
const $notify = useNotifier();
const setup = () => {
  const model = ref<Token>(null);

  const signup = async (e: Email): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    setModel();
    return await api
      .post(`/user/signup`, e)
      .then(setModel)
      .then((): boolean => $notify.ok(null, `🥳`, `Check your email for an invite!`))
      .catch($notify.err)
      .finally(() => Loading.hide());
  };

  const login = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    setModel();
    return await api
      .post(`/user/login`, {}, { auth })
      .then(setModel)
      .then((): boolean => $notify.ok(null, `👋`, `Welcome`))
      .catch($notify.err)
      .finally(() => Loading.hide());
  };

  // Cannot be an arrow function give "this"
  async function logout(this: thisType): Promise<NavigationFailure | void | undefined> {
    Loading.show({ spinnerColor: 'primary' });
    setModel();
    await this.router.push({ name: 'login' });
    Loading.hide();
    $notify.ok(null, `👋`, `Come back soon!`);
    return;
  }

  const authorized = (): boolean => !!model.value;

  const setModel = (res?: AxiosResponse<Auth>): void => {
    const token = res ? res.data.context.token : null;
    model.value = token;
    api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
    $log.debug(null, `Token ${token ? 'set' : 'unset'}`);
  };

  return { token: model, authorized, login, logout, signup };
};

export const useTokenStore = defineStore('token-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
