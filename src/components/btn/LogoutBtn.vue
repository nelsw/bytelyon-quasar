<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
const $store = useTokenStore();
</script>
<template>
  <q-btn @click="$store.Logout" icon="mdi-logout" text-color="grey-8" dense flat>
    <q-tooltip>Log Out</q-tooltip>
  </q-btn>
</template>
