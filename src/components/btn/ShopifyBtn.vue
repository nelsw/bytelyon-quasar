<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';

const $tokenStore = useTokenStore()
</script>

<template>
<q-btn v-if="$tokenStore.IsStu()" size="md" dense flat>
  <q-avatar size="md" square>
    <img src="~assets/shopify-logo.svg" alt="Shopify Logo" />
  </q-avatar>
</q-btn>
</template>
