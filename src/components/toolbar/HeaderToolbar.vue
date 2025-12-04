<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
import NavToggle from 'components/btn/toggle/NavToggle.vue';
const store = useTokenStore();
</script>

<template>
  <q-toolbar>
    <q-avatar>
      <img src="~assets/logo.svg" alt="Logo" />
    </q-avatar>
    <q-toolbar-title class="text-weight-bold"> ByteLyon </q-toolbar-title>
    <q-space />
    <q-separator vertical inset />
    <NavToggle />
    <q-separator vertical />
    <q-btn
      @click="store.logout()"
      color="pink-4"
      class="q-ml-sm"
      dense
      flat
      icon-right="mdi-logout"
    >
      <div class="q-mt-xs q-mx-xs text-weight-medium">Logout</div>
    </q-btn>
  </q-toolbar>
</template>
