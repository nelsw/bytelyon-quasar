import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { type Sitemaps } from 'src/types/sitemaps';

export const useSitemapStore = defineStore('sitemaps-store', () => {

  const loading = ref<boolean>(true);
  const model = ref<Sitemaps[]>([]);

  const load = async () => {
    loading.value = true;
    return await api
      .get('/sitemaps')
      .then((res: AxiosResponse<Sitemaps[]>) => (model.value = res.data))
      .catch(handleError)
      .finally(handleFinally);
  };

  const create = async (url: string) => {
    loading.value = true;
    return await api
      .post('/sitemaps', {url: url})
      .then(load)
      .catch(handleError)
      .finally(handleFinally);
  };

  const remove = async (domain:string, id: string) => {
    loading.value = true;
    return await api
      .delete('/sitemaps', { params: { id: id, domain: domain } })
      .then(load)
      .catch(handleError)
      .finally(handleFinally);
  };

  const handleError = (err: AxiosError) => console.error(err)
  const handleFinally = () => {
    loading.value = false;
  }

  return { loading, model, load, create, remove };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSitemapStore, import.meta.hot));
}
