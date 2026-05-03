import { defineBoot } from '#q-app/wrappers';
import axios, {
  type AxiosError,
  type AxiosBasicCredentials,
  type AxiosResponse,
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from 'axios';
import { useTokenStore } from 'stores/token-store';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: process.env.API
});

export default defineBoot(({ app, store, router }) => {
  // for use inside Vue files through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  // for browser refresh
  const $token = useTokenStore(store);

  // handle bad token
  api.interceptors.request.use(
    async (c: InternalAxiosRequestConfig) => {

      c.headers.Authorization = 'Bearer ' + $token.model?.token;

      const controller = new AbortController();
      if (c.url !== '/auth?action=login' && $token.IsInvalid()) {
        controller.abort();
        await router.replace({ name: 'Login', query: { next: router.currentRoute.value.path, } });
      }

      return {
        ...c,
        signal: controller.signal
      };
    },
    (e: AxiosError) => Promise.reject(e)
  );

  // handle unauthorized & forbidden response status
  api.interceptors.response.use(
    (r: AxiosResponse) => {
      if (process.env.DEBUG_RESPONSE) {
        console.debug(JSON.stringify({ url: r.config.url, data: r.data }, null, 2));
      }
      return r;
    },
    async (e: AxiosError) => {
      console.error(e);
      return Promise.reject(e);
    }
  );
});

export { axios, api, type AxiosError, type AxiosBasicCredentials, type AxiosResponse };
