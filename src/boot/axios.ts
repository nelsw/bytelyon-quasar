import { defineBoot } from '#q-app/wrappers';
import axios, {
  type AxiosError,
  type AxiosBasicCredentials,
  type AxiosResponse,
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from 'axios';
import { useTokenStore } from 'stores/token-store';
import useNotifier from 'src/composable/useNotifier';

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
  const $notify = useNotifier();
  const loginRedirect = async () => {
    $notify.warn('Please log in to continue');
    await router.replace({
      path: '/login',
      query: { next: router.currentRoute.value.fullPath }
    })
  };

  // handle bad token
  api.interceptors.request.use(
    async (c: InternalAxiosRequestConfig) => {

      // bail if we're not logging in or the token is valid
      if (c.url === '/auth?action=login' || !$token.IsExpired()) {
        c.headers.Authorization = 'Bearer ' + $token.model;
        return c;
      }

      // else warn and redirect to login page
      await loginRedirect();

      // and abort request
      const controller = new AbortController();
      controller.abort();

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
      console.log(JSON.stringify({
        url: r.config.url,
        data: r.data
      }, null, 2));
      return r;
    },
    async (e: AxiosError) => {
      if (e.status === 401 || e.status === 403) {
        await loginRedirect();
      }
      return Promise.reject(e);
    }
  );
});

export { axios, api, type AxiosError, type AxiosBasicCredentials, type AxiosResponse };
