<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
import XTooltip from 'components/tooltip/XTooltip.vue';

const store = useTokenStore();
</script>

<template>
  <q-btn @click="store.logout()" color="grey" dense flat size="sm" icon="mdi-logout">
    <x-tooltip anchor="top start" self="bottom middle" :offset="[10, 10]" text="Logout" />
  </q-btn>
</template>
