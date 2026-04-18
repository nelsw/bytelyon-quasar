<script setup lang="ts">
import { useLayoutStore } from 'stores/layout-store';

const $store = useLayoutStore();
</script>

<template>
  <q-btn @click="$store.toggleLeftDrawer" icon="mdi-menu" text-color="grey-8" dense flat />
</template>
