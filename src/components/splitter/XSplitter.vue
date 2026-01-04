<script setup lang="ts">

defineProps<{
  color: string;
}>();
const position = defineModel<number>('position', {
  default: 34,
});
// const limits = defineModel<number[]>('limits', {
//   default: [0, 98],
// });
</script>

<template>
  <q-splitter v-model="position" class="my-splitter">
    <template #before>
      <slot name="before" />
    </template>
    <template #separator>
      <q-avatar :color="color" text-color="white" size="sm" icon="mdi-drag-vertical" />
    </template>
    <template #after>
      <slot name="after" />
    </template>
  </q-splitter>
</template>

<style scoped lang="scss">
.my-splitter {
  height: 100vh;
}
</style>
