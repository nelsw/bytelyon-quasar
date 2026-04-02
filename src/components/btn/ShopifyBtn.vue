<script setup lang="ts">
import { useTokenStore } from 'stores/token-store';

const $tokenStore = useTokenStore();

defineProps<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>();
</script>

<template>
  <q-btn v-if="$tokenStore.IsStu()" :size="size" dense flat>
    <q-avatar :size="size" square>
      <img src="~assets/shopify-logo.svg" alt="Shopify Logo" />
    </q-avatar>
  </q-btn>
</template>
