<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Add query parameter
const onOpen = async () => await router.push({ query: { ...route.query, modal: 'open' } });
</script>
<template>
  <q-btn flat round dense @click="onOpen" color="dark" icon="mdi-cog" text-color="grey-8" />
</template>
