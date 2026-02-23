<script setup lang="ts">
defineProps<{
  names: string[];
}>();
const model = defineModel<string[]>();
</script>

<template>
  <q-btn flat dense icon="mdi-view-column-outline" color="primary">
    <q-menu transition-show="fade" transition-hide="fade" transition-duration="500">
      <q-list v-for="k in names" :key="k">
        <q-item clickable v-close-popup dense>
          <q-item-section>
            <q-checkbox
              :val="k"
              :label="k"
              color="primary"
              v-model="model"
              checked-icon="mdi-eye-outline"
              unchecked-icon="mdi-eye-off-outline"
              size="sm"
              dense
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
