import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { type Search } from 'src/types/search';
import { api, type AxiosResponse, type AxiosError } from 'boot/axios';
import { useNewsStore } from 'stores/news-store';

const id = 'search-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};
const setup = () => {
  const loading = ref<boolean>(true);
  const model = ref<Search[]>([]);

  const load = async () => {
    loading.value = true;
    return await api
      .get(`/search`)
      .then((res: AxiosResponse<Search[]>) => (model.value = res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  const create = async (data: Search) => {
    loading.value = true;
    return await api
      .post(`/search`, data)
      .then((res: AxiosResponse<Search>) => {
        console.log(res);
        model.value.push(res.data);
      })
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  const remove = async (id: string) => {
    loading.value = true;
    return await api
      .delete('/search', { params: { id: id } })
      .then(() => (model.value = model.value.filter((m) => m.id !== id)))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    load,
    create,
    remove,
  };
};
export const useSearchStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsStore, import.meta.hot));
}
