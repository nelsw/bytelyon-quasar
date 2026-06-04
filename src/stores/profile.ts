import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Profile } from 'src/types/profile';

export const useProfileStore = defineStore('profile', () => {
  const model = ref<Profile>({} as Profile);

  return {
    model,
  }
})
