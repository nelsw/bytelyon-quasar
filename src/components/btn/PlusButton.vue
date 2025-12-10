<script setup lang="ts">
import XTooltip from 'components/tooltip/XTooltip.vue';
defineProps<{
  hint?: string
}>()
</script>

<template>
  <q-btn color="green-14" icon="mdi-plus" flat dense >
    <x-tooltip :text="hint" />
  </q-btn>
</template>
