<script setup lang="ts">
import { useAuthStore } from 'stores/auth';

const $tokenStore = useAuthStore();

defineProps<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>();
</script>

<template>
  <q-btn :disable="$tokenStore.isGuest" :size="size" dense flat>
    <q-avatar :size="size" square>
      <img src="~assets/shopify-logo.svg" alt="Shopify Logo" />
    </q-avatar>
  </q-btn>
</template>
