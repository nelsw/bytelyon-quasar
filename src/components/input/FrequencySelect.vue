<script setup lang="ts">
import type { Option} from 'src/types/base';
import { Options } from 'src/types/base';
const model = defineModel<Option>();
</script>

<template>
  <q-select v-model="model" :options="Options" />
</template>
