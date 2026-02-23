<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
defineProps<{
  random?: boolean | undefined;
}>();
</script>

<template>
  <q-btn :to="{ name: 'index' }" color="dark" size="md" round dense flat>
    <q-avatar size="md">
      <LogoImg :random="random" />
    </q-avatar>
  </q-btn>
</template>

<style scoped lang="scss"></style>
