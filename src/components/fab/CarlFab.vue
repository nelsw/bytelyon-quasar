<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
import { useRouter } from 'vue-router';

const $auth = useTokenStore();
const $router = useRouter();

const onLogout = async () => {
  if ($auth.model) $auth.model.token = '';
  await $router.push('/login');
};

const onHome = async () => {
  await $router.push('/');
};
</script>

<template>
  <q-fab
    v-if="$auth.IsExperimental()"
    color="deep-purple"
    text-color="black"
    icon="mdi-fire"
    direction="up"
  >
    <q-fab-action color="grey-8" @click="onLogout" icon="mdi-logout" />
    <q-fab-action color="primary" @click="onHome" icon="mdi-home" />
  </q-fab>
</template>
