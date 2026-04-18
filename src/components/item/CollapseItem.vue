<script setup lang="ts">
import MenuIcon from 'components/icon/MenuIcon.vue';
import { useLayoutStore } from 'stores/layout-store';
const $store = useLayoutStore();
</script>

<template>
  <q-item @click="$store.toggleMiniState()" class="text-grey-8" clickable>
    <q-item-section avatar>
      <MenuIcon v-model="$store.miniState" size="sm" />
    </q-item-section>
    <q-item-section>
      <q-item-label> Collapse </q-item-label>
    </q-item-section>
  </q-item>
</template>
