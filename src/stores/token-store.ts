import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosError, type AxiosResponse } from 'boot/axios';
import { Loading, Notify } from 'quasar';
import { ref } from 'vue';
import { type NavigationFailure } from 'vue-router';
import { useProfileStore } from 'stores/profile-store';

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
  const profileStore = useProfileStore();

  const login = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });

    return await api
      .post('/auth', {}, { auth })
      .then((res: AxiosResponse<Auth>): boolean => {
        token.value = res.data.context.token;
        api.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        console.debug('TokenStore - Set Auth Token');
        return true;
      })
      .then(async () => {
        await profileStore.load();
        Notify.create({
          timeout: 2000,
          position: 'bottom-right',
          message: `<div class="text-center">Welcome ${profileStore.firstName()}</div>`,
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
          position: 'top-right',
        });
        token.value = undefined;
        api.defaults.headers.common.Authorization = null;
        return false;
      })
      .finally(() => Loading.hide());
  };

  // Cannot be an arrow function give "this"
  async function logout(this: thisType): Promise<NavigationFailure | void | undefined> {
    Loading.show({ spinnerColor: 'primary' });
    token.value = undefined;
    api.defaults.headers.common.Authorization = null;
    await this.router.push({ name: 'index' });
    Loading.hide();
    return;
  }

  const authorized = (): boolean => !!token.value;

  return { token, authorized, login, logout };
};

export const useTokenStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
