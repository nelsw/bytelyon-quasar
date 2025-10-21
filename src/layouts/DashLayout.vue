<script setup lang="ts">
import HeaderComponent from 'components/layout/HeaderComponent.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
