<script setup lang="ts">
defineProps<{
  url: string;
  color?: string | undefined;
}>();
const onClick = (s: string) => open(s, '_blank');
</script>

<template>
  <q-btn @click="onClick(url)" :color="url === '' ? 'grey-8' : color ?? 'teal'" dense flat icon="mdi-open-in-new" :disable="url === ''">
    <slot/>
    </q-btn>
</template>
