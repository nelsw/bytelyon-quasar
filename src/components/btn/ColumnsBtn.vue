<script setup lang="ts">
defineProps<{
  names: string[];
}>();
const model = defineModel<string[]>();
</script>

<template>
  <q-btn icon="mdi-view-column-outline" flat dense>
    <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
      Columns Visibility
    </q-tooltip>
    <q-menu transition-show="fade" transition-hide="fade" transition-duration="500">
      <q-list v-for="k in names" :key="k">
        <q-item clickable v-close-popup dense>
          <q-item-section>
            <q-checkbox
              v-model="model"
              :val="k"
              :label="k"
              checked-icon="mdi-eye-outline"
              color="primary"
              size="sm"
              unchecked-icon="mdi-eye-off-outline"
              dense
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
