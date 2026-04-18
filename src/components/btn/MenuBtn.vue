<script setup lang="ts">
import { useLayoutStore } from 'stores/layout-store';
import MenuIcon from 'components/icon/MenuIcon.vue';

const $store = useLayoutStore();
</script>

<template>
  <q-btn @click="$store.toggleLeftDrawer" text-color="grey-8" dense flat>
    <MenuIcon :right="!$store.leftDrawer">
      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
        {{ $store.leftDrawer ? 'Collapse' : 'Expand' }} Menu
      </q-tooltip>
    </MenuIcon>
  </q-btn>
</template>
