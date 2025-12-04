<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  fullscreen: boolean;
  color?: string;
}>();

const icon = computed(() => `mdi-fullscreen${props.fullscreen ? '-exit' : ''}`)
const hint = computed(() => `${props.fullscreen ? 'Exit' : 'Enter'} fullscreen`)
const btnColor = computed(() => props.color ? props.color : 'blue-grey-5')
</script>

<template>
  <q-btn flat dense :icon="icon" :color="btnColor">
    <q-tooltip class="bg-white text-black">
      {{hint}}
    </q-tooltip>
    </q-btn>
</template>

<style scoped lang="scss"></style>
