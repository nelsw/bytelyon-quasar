import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosResponse } from 'boot/axios';
import { Loading } from 'quasar';
import { ref } from 'vue';
import useNotifier from 'src/composable/useNotifier';

type Auth = {
  token?: string;
  context?: {
    message: string;
  }
}

type Claims = {
  iss: string; //'https://ByteLyon.com';
  sub: string; //'019ca7c8-437a-7134-8c2b-c30d17dd62fc';
  exp: number; //1772347378;
  nbf: number; //1772345578;
  iat: number; //1772345578;
  jti: string; //'48e36a74-5526-4998-acfa-16fe4968971e';
  aud: string[]; // anonymous or identified
}
const $notify = useNotifier();

export const useTokenStore = defineStore('token-store', () => {
  const model = ref<Auth>();

  const claims = (): Claims | undefined => {
    if (!model.value) return;
    try {
      // Convert Base64Url to regular Base64
      const base64Payload = (model.value?.token?.split('.')[1] as string)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      // Decode Base64 and parse JSON
      return JSON.parse(
        decodeURIComponent(
          atob(base64Payload)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
        )
      );
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  };

  const Login = async (auth: AxiosBasicCredentials) => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .post(`/auth?action=login`, {}, { auth })
      .then((r: AxiosResponse<Auth>) => model.value = r.data)
      .then((a: Auth) => a.context?.message
        ? $notify.Error(a.context.message)
        : $notify.Icon('Welcome', 'mdi-human-greeting', 'green-13'))
      .finally(() => Loading.hide());
  };

  const IsExpired = (): boolean => Date.now() > (claims()?.exp || 1) * 1000;
  const IsGuest = (): boolean => claims()?.jti === '01KM01JC9PS1R4X4FDJNFAR4AZ';
  const IsInvalid = (): boolean => !IsValid();
  const IsValid = (): boolean => !IsExpired();

  return {
    model,
    IsValid,
    IsInvalid,
    IsExpired,
    IsGuest,
    Login
  };
}, {
  persist: {
    debug: true,
    storage: sessionStorage
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
