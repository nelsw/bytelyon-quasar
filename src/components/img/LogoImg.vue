<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    random?: boolean;
    width?: number | string;
  }>(),
  {
    random: false,
    width: '50%',
  },
);

const i = computed((): number => (props.random ? Math.floor(Math.random() * 3) : 2));
</script>

<template>
  <img v-if="i === 0" src="~assets/ByteLyon-Logo-Alt.svg" alt="ByteLyon Logo" :width="props.width" />
  <img v-else-if="i === 1" src="~assets/ByteLyon-Logo-Gold.svg" alt="ByteLyon Logo" :width="props.width" />
  <img v-else src="~assets/ByteLyon-Logo-OG.svg" alt="ByteLyon Logo" :width="props.width" />
</template>
