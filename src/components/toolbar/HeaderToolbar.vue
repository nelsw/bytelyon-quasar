<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
import LogoImg from 'components/img/LogoImg.vue';
const store = useTokenStore();
</script>

<template>
  <q-toolbar>
    <q-avatar>
      <LogoImg random />
    </q-avatar>
    <q-toolbar-title class="text-bold"> ByteLyon </q-toolbar-title>
    <q-space />
    <q-separator vertical inset />

    <q-separator vertical />
    <q-btn
      @click="store.logout()"
      color="grey"
      class="q-ml-sm"
      dense
      flat
      icon-right="mdi-logout"
    >
      <div class="q-mt-xs q-mx-xs text-weight-medium">Logout</div>
    </q-btn>
  </q-toolbar>
</template>
