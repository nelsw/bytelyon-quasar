import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useAuthApi from 'src/composable/api/useAuthApi';
import type { AxiosBasicCredentials } from 'boot/axios';
import { type Authorization, IsExperimental, IsGuest, IsValid } from 'src/types/authorization';

const $api = useAuthApi();

export const useAuthStore = defineStore(
  'auth',
  () => {
    const model = ref<Authorization>({
      isAuthorized: false,
      context: {},
    });

    const fetchToken = async (creds: AxiosBasicCredentials) => {
      try {
        model.value = await $api.post(creds);
        console.log(model.value);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    };
    const clearToken = () => {
      model.value.context = {};
      model.value.isAuthorized = false;
    };
    /* helpers */

    return {
      clearToken,
      fetchToken,
      authorization: computed(() => `Bearer ${model.value.context?.token}`),
      isExperimental: computed(() => IsExperimental(model.value)),
      isGuest: computed(() => IsGuest(model.value)),
      isValid: computed(() => IsValid(model.value)),
      isInvalid: computed(() => !IsValid(model.value)),
    };
  },
  {
    persist: {
      debug: true,
      storage: localStorage,
    },
  },
);
