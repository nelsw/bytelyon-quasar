<script setup lang="ts">
import FooterComponent from 'components/layout/FooterComponent.vue';
import HeaderComponent from 'components/layout/HeaderComponent.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent />
    <FooterComponent />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
