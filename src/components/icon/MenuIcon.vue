<script setup lang="ts">
const model = defineModel<boolean>();
defineProps<{
  right?: boolean | undefined;
}>();
</script>
<template>
  <q-icon :name="`mdi-menu-${(model && !right) || (!model && right) ? 'close' : 'open'}`" >
    <slot/>
  </q-icon>
</template>
