import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { type Plunder } from 'src/types/plunder';

export const usePlunderStore = defineStore('plunder-store', () => {
  const loading = ref<boolean>(true);
  const model = ref<Plunder[]>([]);

  const load = async () => {
    loading.value = true;
    await api
      .get('/plunder')
      .then((res: AxiosResponse<Plunder[]>) => (model.value = res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    model,
    load,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlunderStore, import.meta.hot));
}
