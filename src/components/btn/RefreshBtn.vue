<script setup lang="ts">
import { useNodeStore } from 'stores/v2/node-store';

const $nodes = useNodeStore();
</script>
<template>
  <q-btn @click="$nodes.Load()" color="primary" icon="mdi-refresh" dense flat no-caps round />
</template>
