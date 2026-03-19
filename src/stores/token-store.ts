import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosResponse } from 'boot/axios';
import { Loading } from 'quasar';
import { ref } from 'vue';
import { type NavigationFailure } from 'vue-router';
import useNotifier from 'src/composable/useNotifier';
import { useLogger } from 'src/composable/useLogger';
import type { AxiosError } from 'axios';
import type { Err } from 'src/types/model';

type thisType = ReturnType<typeof useTokenStore>;
type Token = string | null;

interface Auth {
  token: Token;
  message?: string;
}

interface Claims {
  iss: string; //'https://ByteLyon.com';
  sub: string; //'019ca7c8-437a-7134-8c2b-c30d17dd62fc';
  exp: number; //1772347378;
  nbf: number; //1772345578;
  iat: number; //1772345578;
  jti: string; //'48e36a74-5526-4998-acfa-16fe4968971e';
  aud: string[]; // anonymous or identified
}

const emptyClaims = { iss: '', sub: '', exp: 0, nbf: 0, iat: 0, jti: '', aud: [] };

const $log = useLogger();
const $notify = useNotifier();
const setup = () => {
  const model = ref<Token>(null);

  const claims = (): Claims => {
    if (model.value === null) {
      return emptyClaims;
    }
    try {
      // Convert Base64Url to regular Base64
      const base64Payload = (model.value.split('.')[1] as string)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      // Decode Base64 and parse JSON
      return JSON.parse(
        decodeURIComponent(
          atob(base64Payload)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join(''),
        ),
      );
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return emptyClaims;
    }
  };

  const postToken = async (s:string): Promise<boolean> => {

    return await api
      .post(`/auth/token/${s}`)
      .then(SetModel)
      .then((): boolean => $notify.ok(null, `❤️`, `Welcome to the pack!`))
      .catch((err:AxiosError<Err>) => {
        return $notify.err(err, 'Invalid token; Retry request.')
      })
      .finally(() => Loading.hide());
  };

  const signup = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    SetModel();
    return await api
      .post(`/auth/signup`, {}, { auth })
      .then(SetModel)
      .then((): boolean => $notify.ok(null, `🥳`, `Check your email for an invite!`))
      .catch($notify.err)
      .finally(() => Loading.hide());
  };

  const login = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    SetModel();
    return await api
      .post(`/auth?action=login`, {}, { auth })
      .then(SetModel)
      .then((): boolean => $notify.ok(null, `👋`, `Welcome`))
      .catch($notify.err)
      .finally(() => Loading.hide());
  };

  const forgotPass = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    SetModel();
    return await api
      .post(`/auth/forgot-password`, {}, { auth })
      .then(SetModel)
      .then((): boolean => $notify.ok(null, `📧`, `Reset link sent!`))
      .catch($notify.err)
      .finally(() => Loading.hide());
  };

  const changePass = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    SetModel();
    return await api
      .post(`/auth/change-password`, {}, { auth })
      .then(SetModel)
      .then((): boolean => $notify.ok(null, `🔑`, `Password Saved`))
      .catch($notify.err)
      .finally(() => Loading.hide());
  };

  // Cannot be an arrow function give "this"
  async function logout(this: thisType): Promise<NavigationFailure | void | undefined> {
    Loading.show({ spinnerColor: 'primary' });
    SetModel();
    await this.router.push({ path: '/login' });
    Loading.hide();
    $notify.ok(null, `👋`, `Come back soon!`);
    return;
  }

  const authorized = (): boolean => !!model.value;

  const SetModel = (res?: AxiosResponse<Auth>): void => {
    console.log(res);
    const token = res ? res.data.token : null;
    model.value = token;
    api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
    $log.debug(token ? claims() : null, `Token ${token ? 'set' : 'unset'}: ${token}`);
  };

  const isAnonymous = (): boolean => claims().aud.includes('anonymous');

  const userID = (): string => claims().sub;

  return { token: model, authorized, login, logout, signup, isAnonymous, forgotPass, changePass, userID, postToken  };
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
