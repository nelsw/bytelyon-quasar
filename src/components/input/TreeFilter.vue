<script setup lang="ts">
import { QInput } from 'quasar';
import { onMounted, useTemplateRef } from 'vue';
const model = defineModel<string>({ required: true });
const input = useTemplateRef<QInput>('input');

defineProps<{
  cmd?: boolean;
}>();

onMounted(() =>
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === '/' && model.value.length === 0) {
      input.value?.focus();
      return;
    }

    if (e.key === 'Escape') {
      model.value = '';
      input.value?.blur();
    }
  }),
);
</script>

<template>
  <q-input
    ref="input"
    v-model="model"
    dense
    borderless
    dark
    square
    hide-bottom-space
    placeholder="Filter"
  >
    <template #prepend>
      <q-icon v-if="model.length === 0" name="mdi-filter-variant" color="grey" size="xs" />
      <q-btn v-else dense size="xs" @click="model = ''" flat>
        <q-icon name="mdi-close" color="grey" size="xs" />
      </q-btn>
    </template>
    <template #append>
      <q-badge :outline="true" color="grey-9" align="middle">
        <span class="text-grey text-caption"> {{ `${model.length > 0 ? 'esc' : '⌘/'}` }} </span>
      </q-badge>
    </template>
  </q-input>
</template>
