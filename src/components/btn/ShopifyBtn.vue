<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';

const $tokenStore = useTokenStore()
</script>

<template>
<q-btn v-if="$tokenStore.IsStu()" size="md" dense flat round>
  <q-avatar size="md">
    <img src="~assets/shopify-logo.svg" alt="Shopify Logo" />
  </q-avatar>
</q-btn>
</template>
