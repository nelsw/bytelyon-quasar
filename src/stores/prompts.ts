import { acceptHMRUpdate, defineStore } from 'pinia';
import { type Prompt } from 'src/types/model';
import { ref } from 'vue';

export const usePrompts = defineStore(
  'prompts',
  () => {
    const dialog = ref(false);
    const model = ref<Prompt>({
      system: '',
      message: '',
      result: '',
      html: true,
    });


    return {
      model,
      dialog,
    };
  },
  {
    persist: {
      debug: true,
      storage: sessionStorage,
    },
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePrompts, import.meta.hot));
}
