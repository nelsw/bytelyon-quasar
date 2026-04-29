<script setup lang="ts">
import { BotType } from 'src/types/model';
import { useRoute } from 'vue-router';

defineProps<{
  color: string;
  hint?: boolean | undefined;
  icon?: boolean | undefined;
  label?: boolean | undefined;
}>();

const $route = useRoute();

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
    hide-dropdown-icon
    multiple
    use-chips
    use-input
    dense
    filled
  >
    <template #prepend>
      <q-icon name="mdi-playlist-remove" :color="color" />
    </template>
  </q-select>
</template>
