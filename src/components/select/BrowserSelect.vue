<script setup lang="ts">

type Option = {
  label: string;
  value: boolean;
}

defineProps<{
  color: string;
  hint?: boolean | undefined;
  label?: boolean | undefined;
}>();

const headless = { label: 'Headless', value: true };
const headful = { label: 'Headful', value: false };

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <q-select
    @update:modelValue="(o: Option) => (model = o.value)"
    :model-value="model ? headless : headful"
    :color="color"
    :hint="hint ? 'Headless (Quiet), Headful (Performant)': undefined"
    :label="label ? 'Browser' : undefined"
    :options="[ headless, headful ]"
    dense
    filled
    hide-dropdown-icon
    hide-bottom-space
    square
  >
    <template #prepend>
      <q-icon name="mdi-robot-outline" :color="color" />
    </template>
  </q-select>
</template>
