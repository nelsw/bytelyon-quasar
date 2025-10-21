import { defineBoot } from '#q-app/wrappers';
import axios, {
  type AxiosError,
  type AxiosBasicCredentials,
  type AxiosResponse,
  type AxiosInstance,
} from 'axios';
import { useTokenStore } from 'stores/token-store';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({});

export default defineBoot(({ app, router, store }) => {

  // for use inside Vue files through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  // for browser refresh
  const tokenStore = useTokenStore(store);
  if (tokenStore.token) {
    api.defaults.headers.common.Authorization = `Bearer ${tokenStore.token}`;
  }

  // handle expired token
  api.interceptors.response.use(null, async (e: AxiosError) => {
    console.error(e);
    if (e.status === 401) {
      api.defaults.headers.common.Authorization = null
      return router.replace({ path: '/login', query: { next: router.currentRoute.value.fullPath } });
    }

    return Promise.reject(e)
  })
});

export { axios, api, type AxiosError, type AxiosBasicCredentials, type AxiosResponse };
