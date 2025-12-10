import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { type News } from 'src/types/news';

export const useNewsStore = defineStore('news-store', () => {
  const loading = ref<boolean>(true);
  const model = ref<News[]>([])

  const load = async () => {
    loading.value = true;
    return await api
      .get('/news')
      .then((res: AxiosResponse<News[]>) => model.value = res.data)
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  };

  const remove = async (id: string) => {
    loading.value = true;
    return await api
      .delete('/news', { params: { id: id } })
      .then(() => (model.value = model.value.filter((m) => m.id !== id)))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  };

  const create = async (data: News) => {
    loading.value = true;
    return await api
      .post(`/news`, data)
      .then((res: AxiosResponse) => console.log(res))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  }

  const update = async (data: News) => {
    loading.value = true;
    return await api
    .put(`/news`, data)
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  }

  return { loading, model, remove, load, update, create };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsStore, import.meta.hot));
}
