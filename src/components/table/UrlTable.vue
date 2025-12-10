<script setup lang="ts">
import { ref } from 'vue';
import type { Result } from 'src/types/result';
import { truncateString } from 'src/types/base';
defineProps<{
  rows: string[];
}>();
const filter = ref<string>('');
const handleClick = (r: Result) => window.open(r.link, '_blank');

</script>

<template>
  <q-table
    :rows="rows"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    :rows-per-page-options="[100]"
    dense
    flat
    hide-pagination
  >
    <template #top-left>
      <q-input
        v-model="filter"
        debounce="300"
        color="primary"
        label="Filter URLs"
        name="filter"
        dense
      >
        <template #prepend>
          <q-icon name="mdi-filter" size="sm" />
        </template>
      </q-input>
    </template>
    <template #top-right="props">
      <div class="q-gutter-x-xs">
        <q-pagination
          v-model="props.pagination.page"
          color="primary"
          :max="props.pagesNumber"
          size="sm"
        />
      </div>
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
