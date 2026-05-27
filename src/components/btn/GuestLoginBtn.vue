<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
import { useRouter } from 'vue-router';

const credentials = {
  username: 'demo@demo.com',
  password: 'Demo123!',
};

const $auth = useTokenStore();
const $router = useRouter();

const onClick = async () => {
  if (await $auth.Login(credentials)) {
    await $router.push(($router.currentRoute.value.query.next as string) ?? '/');
  }
};
</script>

<template>
  <q-btn @click="onClick" />
</template>
