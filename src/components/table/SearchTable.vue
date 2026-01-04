<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type QTableColumn } from 'quasar';
import { decodeTime } from 'ulid';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import ColumnList from 'components/list/ColumnList.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import JobBtn from 'components/btn/JobBtn.vue';
import { JobType } from 'src/types/job';
import PlusButton from 'components/btn/PlusButton.vue';
import { FollowTargetsCsv, IgnoreTargetsCsv } from 'src/types/targets';
import { useSearchStore } from 'stores/search-store';
import { type Search } from 'src/types/search';
import { type Page } from 'src/types/page';
import PageTable from 'components/table/PageTable.vue';
import XTooltip from 'components/tooltip/XTooltip.vue';
import SearchDialog from 'components/dialog/SearchDialog.vue';

const store = useSearchStore();
const rowToDelete = ref<string>('');
const rowStyleFn = (id: Search): string =>
  rowToDelete.value === id.id ? 'background-color:#f23d4c;' : 'cursor: pointer;';
const columns: QTableColumn<Search>[] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
  },
  {
    name: 'created',
    label: 'Created',
    field: 'id',
    align: 'left',
    format: (value) => new Date(decodeTime(value)).toLocaleString(),
    sort: (a, b) => decodeTime(a) - decodeTime(b),
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'query',
    label: 'Query',
    field: 'query',
    align: 'left',
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'follow',
    label: 'Follow',
    field: 'targets',
    align: 'left',
    format: FollowTargetsCsv,
  },
  {
    name: 'ignore',
    label: 'Ignore',
    field: 'targets',
    align: 'center',
    format: IgnoreTargetsCsv,
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'pages',
    label: 'Pages',
    field: 'pages',
    align: 'center',
    format: (value: Page[]) => value.length.toString(),
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'id',
    style: 'width: 0;',
  },
];
const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);
onMounted(async () => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value
    .filter((s) => s !== 'url')
    .filter((s) => s !== 'follow')
    .filter((s) => s !== 'ignore');
  await store.load();
});
const dialog = ref<boolean>(false);
</script>

<template>
  <SearchDialog v-model="dialog" />
  <q-table
    :columns="columns"
    :loading="store.loading"
    :pagination="{ sortBy: 'id', descending: true }"
    :rows="store.model"
    :visible-columns="visibleCols"
    :table-row-style-fn="rowStyleFn"
    :hide-pagination="store.model.length <= 5"
    row-key="id"
    flat
    dense
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:top-left>
      <div class="flex justify-center items-center">
        <q-icon name="mdi-search-web" size="lg" @click="store.load()" />
        <span class="q-mx-sm text-h5">Search</span>
      </div>
    </template>
    <template v-slot:top-right="props">
      <div class="flex justify-center items-center q-gutter-xs">
        <PlusButton hint="New<br>Search" @click="dialog = true" />
        <MenuBtn icon="mdi-view-column-outline">
          <template #tooltip>
            <x-tooltip text="Columns" />
          </template>
          <template #menu-content>
            <ColumnList v-model="visibleCols" :names="columnNames" />
          </template>
        </MenuBtn>
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          @click="col.name === 'actions' ? () => {} : (props.expand = !props.expand)"
        >
          <div v-if="col.name === 'actions'">
            <JobBtn :id="props.row.id" :type="JobType.SEARCH" />
            <DeleteBtn @delete="store.remove(props.row.id)" />
          </div>
          <q-badge v-else-if="col.name === 'pages'" color="purple" :label="col.value" />
          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <PageTable :rows="props.row?.pages" class="q-ma-xs" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<style lang="scss" scoped>
.q-table tbody tr:hover {
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
.q-table tbody tr:hover {
  background-color: #37474f !important;
}
</style>
