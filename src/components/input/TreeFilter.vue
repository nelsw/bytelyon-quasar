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
      model.value = '';
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
    <template #before>
      <q-icon v-if="model.length === 0" name="mdi-filter-variant" color="grey" size="xs" />
      <q-btn v-else dense size="xs" @click="model = ''" flat>
        <q-icon name="mdi-close" color="grey" size="xs" />
      </q-btn>
    </template>
    <template v-if="cmd" #after>
      <q-badge :outline="true" color="grey-9" text-color="purple">
        <span class="text-grey q-pa-xs"> {{ `${model.length > 0 ? 'esc' : '⌘/'}` }} </span>
      </q-badge>
    </template>
  </q-input>
</template>
