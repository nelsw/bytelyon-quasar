import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { EmptyProfile, type Profile } from 'src/types/profile';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { clone } from 'src/types/base';

const id = 'profile-store';
const url = '/profiles';

const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};

const setup = () => {
  const loading = ref(true);
  const model = ref<Profile>(EmptyProfile);
  const proxy = ref<Profile>(EmptyProfile);

  const load = async () => {
    if (proxy.value !== EmptyProfile) {
      return;
    }
    loading.value = true;
    await api
      .get(url)
      .then((res: AxiosResponse<Profile>) => {
        model.value = res.data;
        proxy.value = clone<Profile>(res.data);
      })
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  }

  const save = async () => {
    loading.value = true;
    await api
      .put(url, proxy.value)
      .then((res: AxiosResponse<Profile>) => {
        model.value = res.data;
        proxy.value = clone<Profile>(res.data);
      })
      .catch((err: AxiosError) => console.error(err))
      .finally(() => loading.value = false);
  }

  const reset = () => proxy.value = clone<Profile>(model.value);

  const firstName = () => proxy.value.name.toString().split(' ')[0]

  return {
    loading,
    proxy,
    load,
    save,
    reset,
    firstName,
  };
};

export const useProfileStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
