<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';

const $auth = useAuthStore();
const $router = useRouter();

const onClick = async () => {
  if (
    await $auth.fetchToken({
      username: 'demo@demo.com',
      password: 'Demo123!',
    })
  ) {
    await $router.push(($router.currentRoute.value.query.next as string) ?? '/');
  }
};
</script>

<template>
  <q-btn @click="onClick" />
</template>
