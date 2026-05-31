<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth';

const $auth = useAuthStore();
const $router = useRouter();

const onLogout = async () => {
  $auth.clearToken();
  await $router.push('/login');
};

const onHome = async () => {
  await $router.push('/');
};
</script>

<template>
  <q-fab
    v-if="$auth.isExperimental"
    color="deep-purple"
    text-color="black"
    icon="mdi-fire"
    direction="up"
  >
    <q-fab-action color="grey-8" @click="onLogout" icon="mdi-logout" />
    <q-fab-action color="primary" @click="onHome" icon="mdi-home" />
  </q-fab>
</template>
