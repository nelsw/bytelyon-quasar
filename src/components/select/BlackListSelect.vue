<script setup lang="ts">
import { BotType } from 'src/types/model';

defineProps<{
  color: string;
  hint?: boolean | undefined;
  icon?: boolean | undefined;
  label?: boolean | undefined;
}>();

const model = defineModel<string[]>({ required: true });
</script>

<template>
  <q-select
    v-if="$route.params.botType !== BotType.Sitemap"
    v-model="model"
    :color="color"
    :hint="
      !hint
        ? undefined
        : $route.params.botType === BotType.News
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
      <q-icon name="mdi-playlist-remove" :color="color" />
    </template>
  </q-select>
</template>
