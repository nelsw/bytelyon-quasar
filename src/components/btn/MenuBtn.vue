<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  icon: string;
  color?: string
}>()
const btnColor = computed(() => props.color ? props.color : 'blue-grey-5')
</script>

<template>
  <q-btn flat dense :icon="icon" :color="btnColor">
    <slot name="tooltip" />
    <q-menu>
      <slot name="menu-content" />
    </q-menu>
  </q-btn>
</template>
