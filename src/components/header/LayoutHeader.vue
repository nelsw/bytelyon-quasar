<script setup lang="ts">
import HeaderToolbar from 'components/toolbar/HeaderToolbar.vue';
</script>

<template>

  <q-header class="bg-dark" bordered>
    <HeaderToolbar />
  </q-header>

</template>

<style scoped lang="scss">
.q-header.bg-dark {
  border-color: rgb(255, 255, 255, 0.12) !important;
}
.q-separator--dark {
  background-color: rgb(255, 255, 255, 0.12);
}
</style>
