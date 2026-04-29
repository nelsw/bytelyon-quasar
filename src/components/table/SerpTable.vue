<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { SerpResult } from 'src/types/model';
import { computed, ref } from 'vue';
import FilterInput from 'components/input/FilterInput.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';

const props = defineProps<{
  loading: boolean;
  name: string;
  results: SerpResult[];
}>()

const columns = computed(() => {
  if (props.name.includes('Also ')) {
    return [{ name: 'Title', label: 'Title', field: 'title', align: 'left' }] as QTableColumn[];
  }
  return [
    { name: 'Rank', label: 'Rank', field: 'position', align: 'center', format: (val) => val+1 },
    { name: 'Source', label: 'Source', field: 'source', align: 'left' },
    { name: 'Title', label: 'Title', field: 'title', align: 'left' },
    { name: 'Description', label: 'Description', field: 'snippet', align: 'left' },
  ] as QTableColumn[];
});

const filter = ref<string>('');
const columnNames = ref<string[]>(columns.value.map((col) => col.name).filter((s) => s !== ''));
const visibleCols = ref<string[]>(columnNames.value);

const onRowClick = (_evt: Event, row: SerpResult): void => {
  open(row.link, '_blank');
  return;
};
</script>

<template>
  <q-table
    :loading="loading"
    :columns="columns"
    :filter="filter"
    :rows-per-page-options="[10, 25, 50, 100, 0]"
    :rows="results"
    :visible-columns="visibleCols"
    color="primary"
    row-key="Rank"
    rowsPerPageLabel="Results per page"
    binary-state-sort
    dense
    flat
    :hide-header="name.includes('Also ')"
    @rowClick="onRowClick"
  >
    <template #top-left>
      <FilterInput v-model="filter" :placeholder="`Filter ${name} Results`" />
    </template>
    <template v-if="name === 'Organic'" #top-right>
      <ColumnsBtn v-model="visibleCols" :names="columnNames" color="primary" />
    </template>
  </q-table>
</template>

<style scoped lang="scss"></style>
