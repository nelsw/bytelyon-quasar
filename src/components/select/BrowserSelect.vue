<script setup lang="ts">
defineProps<{
  create?: boolean;
  hint?: boolean | undefined;
  label?: boolean | undefined;
}>();

const headless = { label: 'Headless', value: true };
const headful = { label: 'Headed', value: false };

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-select
    @update:modelValue="(o) => (model = o.value)"
    :model-value="model ? headless : headful"
    :color="create ? 'green-13' : 'amber-13'"
    :hint="hint ? 'Headless (Quiet), Headful (Performant)' : undefined"
    :label="label ? 'Browser' : undefined"
    :options="[headless, headful]"
    dense
    filled
    hide-dropdown-icon
    hide-bottom-space
  >
    <template #prepend>
      <q-icon name="mdi-robot-outline" :color="create ? 'green-13' : 'amber-13'" />
    </template>
  </q-select>
</template>
