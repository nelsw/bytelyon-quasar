<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
defineProps<{
  random?: boolean | undefined;
}>()
</script>

<template>
  <q-btn dense flat :to="{ name: 'index' }" color="dark" size="md" round >
    <q-avatar size="md">
      <LogoImg :random="random" />
    </q-avatar>
  </q-btn>
</template>

<style scoped lang="scss"></style>
