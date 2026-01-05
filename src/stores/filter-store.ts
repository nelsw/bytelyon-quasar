import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

const id = 'filter-store';
const options = {};

const setup = () => {
  const model = ref<string>('')
  return {
    model,
  }
}

export const useFilterStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFilterStore, import.meta.hot));
}
