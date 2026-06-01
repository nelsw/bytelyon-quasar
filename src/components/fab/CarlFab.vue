<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const $user = useUserStore();
const $router = useRouter();

const onHome = async () => {
  await $router.push('/');
};
</script>

<template>
  <q-fab
    v-if="$user.auth.IsExperimental"
    color="deep-purple"
    text-color="black"
    icon="mdi-fire"
    direction="up"
  >
    <q-fab-action color="grey-8" @click="$user.logout" icon="mdi-logout" />
    <q-fab-action color="primary" @click="onHome" icon="mdi-home" />
  </q-fab>
</template>
