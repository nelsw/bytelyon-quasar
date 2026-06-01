import { defineStore } from 'pinia';
import { ref } from 'vue';
import useAuthApi from 'src/composable/api/useAuthApi';
import { type Auth, JwtAuth } from 'src/types/auth';

type thisType = ReturnType<typeof useUserStore>;

const $api = useAuthApi();

export const useUserStore = defineStore(
  'user',
  () => {
    const auth = ref(new JwtAuth());

    async function login(this:thisType, username:string, password:string) {
      try {
        const a:Auth = await $api.post({username, password});
        if (a.isAuthorized) {
          auth.value = new JwtAuth(a);
          await this.router.push((this.router.currentRoute.value.query.next as string) ?? '/');
          return
        }
        alert('unauthorized');
      } catch (e) {
        console.error(e);
      }
    }

    async function logout(this:thisType) {
      auth.value = new JwtAuth();
      try {
        await this.router.push({ path: '/login' });
      } catch (e) {
        console.error(e);
      }
    }

    return {
      auth,
      login,
      logout,
    };
  },
  {
    persist: {
      debug: true,
      storage: localStorage,
    },
  },
);
