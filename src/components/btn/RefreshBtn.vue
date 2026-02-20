<script setup lang="ts">
import { useNodeStore } from 'stores/node-store';

const $nodes = useNodeStore();
</script>
<template>
  <q-btn @click="$nodes.Load()" text-color="grey-8" icon="mdi-refresh" />
</template>
