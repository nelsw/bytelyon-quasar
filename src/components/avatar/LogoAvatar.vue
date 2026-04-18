<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
defineProps<{
  random?: boolean | undefined;
  width?: number | string;
}>();
</script>

<template>
  <q-avatar>
    <LogoImg :random="random ?? false" :width="width ?? 'auto'" />
  </q-avatar>
</template>
