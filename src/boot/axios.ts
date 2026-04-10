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

const api = axios.create({
  baseURL: process.env.API,
});

export default defineBoot(({ app, store, router }) => {
  // for use inside Vue files through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  // for browser refresh
  const tokenStore = useTokenStore(store);

  router.beforeEach((to, from) => {
    console.debug(`router.beforeEach - from:${from.fullPath}, to:${to.fullPath}`);
    // if (from.path === '/login' || from.path === '/') {
    //   next();
    //   return;
    // }
  //   if (!tokenStore.IsExpired() || from.path === '/login' || from .path === '/') {
  //     return next();
  //   }
  //   console.debug(from, to)
  //   if (tokenStore.IsExpired()) {
  //     api.defaults.headers.common.Authorization = null;
  //     await router.replace({
  //       path: '/login',
  //       query: { next: to.fullPath },
  //     });
  //   }
  //   return next();
  })


  if (tokenStore.token) {
    api.defaults.headers.common.Authorization = `Bearer ${tokenStore.token}`;
  }

  // handle expired token
  api.interceptors.response.use(
    (r: AxiosResponse) => r,
    async (e: AxiosError) => {
      console.error(e);
      if (e.status === 401 || e.status === 403) {
        api.defaults.headers.common.Authorization = null;
        return router.replace({
          path: '/login',
          query: { next: router.currentRoute.value.fullPath },
        });
      }

      return Promise.reject(e);
    },
  );
});

export { axios, api, type AxiosError, type AxiosBasicCredentials, type AxiosResponse };
