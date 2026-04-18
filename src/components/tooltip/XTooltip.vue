<script setup lang="ts">
defineProps<{
  left?: boolean;
  right?: boolean;
  text: string;
}>();
</script>

<template>
  <q-tooltip v-if="left" anchor="center left" self="center right" :offset="[10, 10]">
    {{ text }}
  </q-tooltip>
  <q-tooltip v-else-if="right" anchor="center right" self="center left" :offset="[10, 10]">
    {{ text }}
  </q-tooltip>
  <q-tooltip v-else>{{ text }}</q-tooltip>
</template>
