<script setup lang="ts">
import LayoutHeader from 'components/header/LayoutHeader.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <LayoutHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
