<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type Search } from 'src/types/model';

const searches = ref<Search[]>([]);
onMounted(async () => {});
</script>

<template>
  <pre>{{ searches }}</pre>
</template>
