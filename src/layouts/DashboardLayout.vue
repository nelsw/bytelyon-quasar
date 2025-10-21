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
        <q-toolbar-title class="brand-font-700"> ByteLyon </q-toolbar-title>
        <q-space />
        <q-separator vertical inset />
        <q-btn
          @click="store.logout()"
          color="info"
          icon-right="mdi-login"
          label="Logout"
          style="margin-left: 12px"
          dense
          flat
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
