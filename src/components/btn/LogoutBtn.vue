<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
const $store = useTokenStore();
const onClick = async () => {
  await $store.logout();
};
</script>
<template>
  <q-btn text-color="grey-8"  icon="mdi-logout" @click="onClick" />
</template>
