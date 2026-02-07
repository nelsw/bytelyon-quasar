import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import type { Search } from 'src/types/model';

const id = 'search-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};

const setup = () => {
  const model = ref<Search[]>([]);

  const load = async (): Promise<void> => {
    await api
      .get<Search[]>(`http://localhost:8080/api/articles`)
      .then((res: AxiosResponse<Search[]>) => {
        console.debug(`✅ Searches Loaded`, res.data.length);
        model.value = res.data;
      })
      .catch((err: AxiosError) => {
        console.error(err.response?.statusText);
      });
  };

  return {
    load,
    model,
  };
};

export const useSearchStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot));
}
