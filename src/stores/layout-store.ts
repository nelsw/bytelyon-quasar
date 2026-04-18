import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout-store', () => {
  const miniState = ref<boolean>(false);
  const leftDrawer = ref<boolean>(true);

  const toggleLeftDrawer = () => leftDrawer.value = !leftDrawer.value;
  const toggleMiniState = () => (miniState.value = !miniState.value);

  return {
    miniState,
    leftDrawer,
    toggleLeftDrawer,
    toggleMiniState,
  }
}, {
  persist: {
    debug: true,
    storage: localStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}
