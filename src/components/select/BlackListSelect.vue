<script setup lang="ts">
import { computed } from 'vue';
import { BotType } from 'src/types/model';

const props = defineProps<{
  color: string;
  botType: BotType;
}>();

const model = defineModel<string[]>();

const hint = computed(() => {
  if (props.botType === BotType.News) {
    return 'Exclude articles that contain these keywords';
  } else {
    return 'Exclude result pages that contain these domains';
  }
});
</script>

<template>
  <q-select
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
