<script setup lang="ts">
import type { Option} from 'src/types/base';
import { Options } from 'src/types/base';
const model = defineModel<Option>();
defineProps<{
  color?: string | undefined;
}>()
</script>

<template>
  <q-select v-model="model" :options="Options" :color="color" hide-dropdown-icon>
    <template #prepend>
      <q-icon name="mdi-repeat" :color="color" />
    </template>
  </q-select>
</template>
