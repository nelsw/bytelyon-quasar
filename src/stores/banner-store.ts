import { acceptHMRUpdate, defineStore } from 'pinia';
import { reactive } from 'vue';

type State = {
  devBanner: boolean | null;
};

const setup = () => {
  const model = reactive<State>({
    devBanner: (window.location.href.match(/^http:\/\/(localhost|127.0.0.1).*/i)?.length || 0) > 0,
  });

  const showDevBanner = (): boolean => model.devBanner === true;

  const hideDevBanner = (): void => {
    model.devBanner = false;
  };

  return {
    model,
    showDevBanner,
    hideDevBanner,
  };
};

export const useBannerStore = defineStore('banner-store', setup, {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBannerStore, import.meta.hot));
}
