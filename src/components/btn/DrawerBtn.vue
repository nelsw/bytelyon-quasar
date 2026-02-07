<script setup lang="ts">

defineProps<{
  side: string;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <q-btn
    @click="model = !model"
    :class="`absolute-bottom-${side} q-ma-sm`"
    :icon="`mdi-arrow-collapse-${model ? side : side === 'left' ? 'right' : 'left'}`"
    color="grey"
    size="sm"
    dense
    flat
  />
</template>
