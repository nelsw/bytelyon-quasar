<script setup lang="ts">
import { titleCase } from 'src/types/base';
import { onMounted, ref } from 'vue';
import VisibleCheckbox from 'components/checkbox/VisibleCheckbox.vue';

const model = defineModel<string[]>({
  required: true,
});
const keys = ref<string[]>([]);

onMounted(() => keys.value = model.value);
</script>

<template>
  <q-list class="my-list" v-for="k in keys" :key="k">
    <q-item v-if="k !== '$'" clickable v-close-popup dense>
      <q-item-section>
        <VisibleCheckbox v-model="model" :val="k" :label="titleCase(k)" dense size="xs" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped lang="scss">
.my-list {
  min-width: 100px;
}
</style>
