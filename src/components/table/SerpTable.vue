<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { SerpResult } from 'src/types/model';
import { computed, ref } from 'vue';
import FilterInput from 'components/input/FilterInput.vue';
import ColumnsBtn from 'components/btn/ColumnsBtn.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';

const props = defineProps<{
  loading: boolean;
  name: string;
  results: SerpResult[];
}>()

const columns = computed(() => {
  if (props.name.includes('Also ')) {
    return [
      { name: 'Rank', label: 'Rank', field: 'position', align: 'center', format: (val) => val+1 },
      { name: 'Title', label: 'Title', field: 'title', align: 'left' },
    ] as QTableColumn[];
  }
  return [
    { name: 'Rank', label: 'Rank', field: 'position', align: 'center', format: (val) => val+1 },
    { name: 'Source', label: 'Source', field: 'source', align: 'left' },
    { name: 'Title', label: 'Title', field: 'title', align: 'left' },
    { name: 'Description', label: 'Description', field: 'snippet', align: 'left' },
    { name: 'Open', label: 'Open', field: 'url', align: 'center', style: 'width: 0;' },
  ] as QTableColumn[];
});

const filter = ref<string>('');
const columnNames = ref<string[]>(columns.value.map((col) => col.name));
const visibleCols = ref<string[]>(columnNames.value);
</script>

<template>
  <q-table
    :loading="loading"
    :columns="columns"
    :filter="filter"
    :rows-per-page-options="[0]"
    :rows="results"
    :visible-columns="visibleCols"
    color="primary"
    row-key="Rank"
    rowsPerPageLabel="Organic Results per page"
    binary-state-sort
    dense
    flat
    :hide-header="name.includes('Also ')"
    hide-bottom
  >
    <template #top>
      <FilterInput v-model="filter" :placeholder="`${name} Results`" />
      <q-space />
      <ColumnsBtn v-if="name === 'Organic'" v-model="visibleCols" :names="columnNames" color="primary" />
    </template>
    <template #body-cell-Rank="props">
      <q-td :props="props">
        <q-badge outline color="primary" size="sm" >
          <span class="text-white">{{props.pageIndex+1}}</span>
        </q-badge>
      </q-td>
    </template>
    <template #body-cell-Open="props">
      <q-td :props="props">
        <OpenInNewBtn :url="props.value" size="sm"/>
      </q-td>
    </template>
  </q-table>
</template>
