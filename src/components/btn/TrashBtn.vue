<script setup lang="ts">
defineProps<{
  disable?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tooltip?: string | undefined;
}>();
</script>
<template>
  <q-btn
    :size="size || 'sm'"
    :color="disable ? 'grey-9' : 'pink-13'"
    icon="mdi-delete-outline"
    dense
    flat
  >
    <q-tooltip v-if="tooltip !== undefined">
      {{ tooltip }}
    </q-tooltip>
    <slot />
  </q-btn>
</template>
