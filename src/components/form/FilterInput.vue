<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

const props = defineProps<{
  label?: string;
  color?: string;
}>();

const model = defineModel<string>();

const label = computed(() => {
  return props.label || 'Filter';
});

const input = useTemplateRef<HTMLInputElement>('my-input');
const reset = (): void => {
  model.value = '';
  input.value?.focus();
};
</script>

<template>
  <q-input ref="my-input"  v-model="model" :label="label" :color="color ?? ''" dense >
    <template #prepend>
      <q-icon name="mdi-table-filter" size="xs" :color="color" />
      </template>
    <template #append>
      <q-icon
        v-if="model !== ''"
        name="mdi-close-circle-outline"
        class="cursor-pointer"
        @click="reset"
        size="xs"
:color="color"
      />
    </template>
  </q-input>
</template>
