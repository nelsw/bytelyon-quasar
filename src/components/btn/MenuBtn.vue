<script setup lang="ts">
import { useLayoutStore } from 'stores/layout-store';

const $store = useLayoutStore();
</script>

<template>
  <q-btn
    @click="$store.toggleLeftDrawer"
    :icon="`mdi-menu-${!$store.leftDrawer ? 'close' : 'open'}`"
    color="grey-8"
    dense
    flat
  >
    <q-tooltip anchor="top start" self="bottom left" :offset="[10, 10]">
      {{ $store.leftDrawer ? 'Collapse' : 'Expand' }} Menu
    </q-tooltip>
  </q-btn>
</template>
