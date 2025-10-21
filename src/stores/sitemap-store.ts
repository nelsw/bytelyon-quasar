import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';

interface State {
  items: Item[];
  size: number;
  total: number;
}

interface Item {
  domain: string;
  end: string;
  start: string;
  tracked: string[];
  url: string;
  visited: string[];
}

export const useSitemapStore = defineStore('sitemap-store', () => {

  const loading = ref<boolean>(true);
  const items = ref<Item[]>([]);

  const fetch = async () => {
    loading.value = true;
    return await api
      .get(process.env.API_USER, { params: { delimiter: 'sitemap' } })
      .then((res: AxiosResponse<State>) => items.value = res.data.items)
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  };

  const create = async (url:string) => {
    loading.value = true;
    return await api
      .post(process.env.API_SITEMAP, { url: url })
      .then((res: AxiosResponse<Item>) => items.value.push(res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  }

  const remove = async (url:string) => {
    loading.value = true;
    return await api
      .delete(process.env.API_USER, { params: { delimiter: 'sitemap' }, data: { url:url } })
      .then(() => items.value = items.value.filter(item => item.url !== url))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  }

  return { loading, items, fetch, create, remove };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemapStore, import.meta.hot));
}
