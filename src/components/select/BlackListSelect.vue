<script setup lang="ts">
defineProps<{
  create?: boolean;
  hint?: boolean | undefined;
  icon?: boolean | undefined;
  label?: boolean | undefined;
}>();

const model = defineModel<string[]>({ required: true });
</script>

<template>
  <q-select
    v-if="$route.params.botType !== 'sitemap'"
    v-model="model"
    :color="create ? 'green' : 'amber-13'"
    :hint="
      !hint
        ? undefined
        : $route.params.botType === 'news'
          ? 'Exclude articles that contain these keywords'
          : 'Exclude result pages that contain these domains'
    "
    input-debounce="0"
    label="Exclusions"
    new-value-mode="add-unique"
    dense
    filled
    hide-dropdown-icon
    hide-bottom-space
    multiple
    use-chips
    use-input
    square
  >
    <template #prepend>
      <q-icon name="mdi-playlist-remove" :color="create ? 'green' : 'amber-13'" />
    </template>
  </q-select>
</template>
