<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';
const store = useTokenStore();
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark" bordered>
      <q-toolbar>
        <q-avatar>
          <img src="~assets/logo.svg" alt="Logo" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold"> ByteLyon </q-toolbar-title>
        <q-space />
        <q-separator vertical inset />
          <q-btn
            @click="store.logout()"
            color="accent"
            style="margin-left: 12px"
            dense
            flat
            icon-right="mdi-logout"
          >
            <div class="q-mt-xs q-mx-xs text-weight-medium">Logout</div>
          </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.q-header {
  border-color: rgb(255, 255, 255, 0.12) !important;
}
.q-separator--dark {
  background-color: rgb(255, 255, 255, 0.12);
}
</style>
