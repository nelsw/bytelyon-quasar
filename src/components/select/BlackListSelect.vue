<script setup lang="ts">
import { computed } from 'vue';
import { BotType } from 'src/types/model';
import { useRoute } from 'vue-router';

defineProps<{
  color: string;
}>();

const $route = useRoute();

const model = defineModel<string[]>({ required: true });

const hint = computed(() => {
  if ($route.params.botType === BotType.News) {
    return 'Exclude articles that contain these keywords';
  } else {
    return 'Exclude result pages that contain these domains';
  }
});
</script>

<template>
  <q-select
    v-if="$route.params.botType !== BotType.Sitemap"
    v-model="model"
    :color="color"
    :hint="hint"
    input-debounce="0"
    label="Exclusions"
    new-value-mode="add-unique"
    hide-dropdown-icon
    multiple
    use-chips
    use-input
  >
    <template #prepend>
      <q-icon name="mdi-alert-circle-outline" :color="color" />
    </template>
  </q-select>
</template>
