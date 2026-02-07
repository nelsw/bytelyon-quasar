<script setup lang="ts">
import { BotEnum } from 'src/types/base';
import { computed } from 'vue';

const props = defineProps<{
  color: string;
  botType: BotEnum;
}>();

const model = defineModel<string[]>();

const hint = computed(() => {
  if (props.botType === BotEnum.Articles) {
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
    dense
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
