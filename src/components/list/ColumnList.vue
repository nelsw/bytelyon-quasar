<script setup lang="ts">
import { capitalize } from 'src/types/base';
import VisibleCheckbox from 'components/checkbox/VisibleCheckbox.vue';

defineProps<{
  names: string[];
}>();

const model = defineModel<string[]>({
  required: true,
});
</script>

<template>
  <q-list class="my-list" v-for="k in names" :key="k">
    <q-item v-if="k !== '$'" clickable v-close-popup dense>
      <q-item-section>
        <VisibleCheckbox v-model="model" :val="k" :label="capitalize(k)" dense size="xs" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped lang="scss">
.my-list {
  min-width: 100px;
}
</style>
