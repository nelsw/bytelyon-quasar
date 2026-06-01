<script setup lang="ts">
import { useUserStore } from 'stores/user';
const $user = useUserStore();
</script>

<template>
  <q-btn @click="$user.login('demo@demo.com', 'Demo123!')" />
</template>
