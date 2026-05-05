<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
import { useRouter } from 'vue-router';

const $auth = useTokenStore();
const $router = useRouter();

const onLogout = async () => {
  $auth.model = undefined;
  await $router.push('/login');
};

const onHome = async () => {
  await $router.push('/');
};
</script>

<template>
  <q-fab color="amber" text-color="black" icon="mdi-bug" direction="up">
    <q-fab-action color="grey-8" @click="onLogout" icon="mdi-logout" />
    <q-fab-action color="primary" @click="onHome" icon="mdi-home" />
  </q-fab>
</template>
