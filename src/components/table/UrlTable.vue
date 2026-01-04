<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { Result } from 'src/types/result';
import { truncateString } from 'src/types/base';
defineProps<{
  rows: string[];
}>();
const input = useTemplateRef<HTMLInputElement>('my-input');
const reset = (): void => {
  filter.value = '';
  input.value?.focus();
};
const filter = ref<string>('');
const handleClick = (r: Result) => window.open(r.link, '_blank');
</script>

<template>
  <q-table
    :rows="rows"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    :rows-per-page-options="[1000]"
    dense
    flat
    :hide-pagination="rows.length < 1000"
  >
    <template #top v-if="rows.length > 100">
      <q-input
        ref="my-input"
        v-model="filter"
        debounce="300"
        color="primary"
        label="URL Filter"
        name="filter"
        dense
      >
        <template #prepend>
          <q-icon name="mdi-filter-outline" size="xs" />
        </template>
        <template #append>
          <q-icon
            v-if="filter !== ''"
            name="mdi-close-circle-outline"
            class="cursor-pointer"
            @click="reset"
            size="xs"
          />
        </template>
      </q-input>
    </template>
    <template #header>
      <q-tr>
        <q-th style="text-align: left"> # </q-th>
        <q-th style="text-align: left"> URL </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props" @click="handleClick">
        <q-td colspan="1" style="width: 12px">
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td colspan="1" style="text-align: left">
          {{ truncateString(props.row, 200) }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
