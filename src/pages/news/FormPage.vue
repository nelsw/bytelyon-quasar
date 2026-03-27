<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const $r = useRouter();

onMounted(() => {
  alert($r.currentRoute.value);
});
</script>

<template>
  {{ $r.currentRoute.value }}
</template>

<style scoped lang="scss"></style>
