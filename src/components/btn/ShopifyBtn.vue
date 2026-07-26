<script setup lang="ts">
import { useUserStore } from 'src/stores/user';

const $tokenStore = useUserStore();

defineProps<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>();
</script>

<template>
  <q-btn :disable="$tokenStore.auth.IsGuest" :size="size" dense flat>
    <q-avatar :size="size" square>
      <img src="~assets/shopify-logo.svg" alt="Shopify Logo" />
    </q-avatar>
  </q-btn>
</template>
