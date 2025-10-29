import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';

interface Item {
  domain: string;
  end: string;
  start: string;
  tracked: string[];
  url: string;
  visited: string[];
}

export const useSitemapStore = defineStore('sitemaps', () => {

  const loading = ref<boolean>(true);
  const items = ref<Item[]>([]);
  const url = ref<string>('');

  const fetch = async () => {
    loading.value = true;
    return await api
      .get('/sitemaps')
      .then((res: AxiosResponse<Item[]>) => (items.value = res.data ?? []))
      .catch(handleError)
      .finally(handleFinally);
  };

  const create = async () => {
    loading.value = true;
    return await api
      .post('/sitemaps', {}, {params: { url: btoa(url.value) } })
      .then((res: AxiosResponse<Item>) => items.value.push(res.data))
      .catch(handleError)
      .finally(handleFinally);
  };

  const remove = async (url: string) => {
    loading.value = true;
    console.log(btoa(url));
    return await api
      .delete('/sitemaps', { params: { url: btoa(url) } })
      .then(() => (items.value = items.value.filter((item) => item.url !== url)))
      .catch(handleError)
      .finally(handleFinally);
  };

  const handleError = (err: AxiosError) => console.error(err)
  const handleFinally = () => {
    loading.value = false;
    url.value = '';
  }

  return { loading, items, url, fetch, create, remove };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemapStore, import.meta.hot));
}
