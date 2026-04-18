<script setup lang="ts">
import { computed } from 'vue';
import { type Bot, BotType } from 'src/types/model';

const model = defineModel<Bot>({ required: true });

const hint = computed(() => {
  if (model.value.type === BotType.News) {
    return 'Exclude articles that contain these keywords';
  } else {
    return 'Exclude result pages that contain these domains';
  }
});
</script>

<template>
  <q-select
    v-if="model.type !== BotType.Sitemap"
    v-model="model.blackList"
    :color="model.id === '' ? 'green-13' : 'amber-13'"
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
      <q-icon name="mdi-alert-circle-outline" :color="model.id === '' ? 'green-13' : 'amber-13'" />
    </template>
  </q-select>
</template>
