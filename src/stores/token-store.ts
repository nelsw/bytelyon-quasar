import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosBasicCredentials, type AxiosResponse } from 'boot/axios';
import { Loading } from 'quasar';
import { ref } from 'vue';
import { type NavigationFailure } from 'vue-router';
import useNotifier from 'src/composable/useNotifier';

type thisType = ReturnType<typeof useTokenStore>;
type Token = string | null | undefined;

type Auth = {
  token: Token;
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

const setup = () => {
  const model = ref<Token>();

  const claims = (): Claims | undefined => {
    try {
      // Convert Base64Url to regular Base64
      const base64Payload = (model.value?.split('.')[1] as string)
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

  const Login = async (auth: AxiosBasicCredentials): Promise<boolean> => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .post(`/auth?action=login`, {}, { auth })
      .then((r:AxiosResponse<Auth>) => {
        if (r.data.context) {
          $notify.Error(r.data.context.message)
          return false;
        }
        model.value = r.data.token
        $notify.Icon('Welcome', 'mdi-human-greeting', 'green-13')
        return true;
      })
      .finally(() => Loading.hide());
  };

  // Cannot be an arrow function give "this"
  async function Logout(this: thisType): Promise<NavigationFailure | void | undefined> {
    Loading.show({ spinnerColor: 'primary' });
    model.value = undefined
    await this.router.push({ path: '/login' });
    Loading.hide();
    $notify.ok(null, `👋`, `Come back soon!`);
    return;
  }

  const IsExpired = (): boolean => !IsEmpty() && Date.now() > (claims()?.exp || 1) * 1000;
  const IsEmpty = (): boolean => model.value?.length === 0;
  const IsGuest = (): boolean => claims()?.jti === '01KM01JC9PS1R4X4FDJNFAR4AZ';

  return {
    model,
    IsEmpty,
    IsExpired,
    IsGuest,
    Login,
    Logout,
  };
};

export const useTokenStore = defineStore('token-store', setup, {
  persist: {
    debug: true,
    storage: localStorage
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot));
}
