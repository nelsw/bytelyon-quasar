import { defineBoot } from '#q-app/wrappers';
import axios, {
  type AxiosError,
  type AxiosBasicCredentials,
  type AxiosResponse,
  type AxiosInstance,
} from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({
  // baseURL: process.env.API,
});

export default defineBoot(({ app }) => {
  // for use inside Vue files through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { axios, api, type AxiosError, type AxiosBasicCredentials, type AxiosResponse };
