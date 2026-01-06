<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';

const store = useTokenStore();
</script>

<template>
  <q-btn @click="store.logout()" text-color="grey" dense flat size="md" icon="mdi-exit-to-app" />
</template>
