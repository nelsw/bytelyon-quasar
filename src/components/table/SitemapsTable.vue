<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSitemapStore } from 'stores/sitemap-store';
import { type QTableColumn } from 'quasar';
import XTooltip from 'components/tooltip/XTooltip.vue';
import ColumnList from 'components/list/ColumnList.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import SitemapDialog from 'components/dialog/SitemapDialog.vue';
import { type Sitemaps } from 'src/types/sitemaps';
import { decodeTime } from 'ulid';
import SitemapTable from 'components/table/SitemapTable.vue';
import PlusBtn from 'components/btn/PlusBtn.vue';

const store = useSitemapStore();
const columns: QTableColumn<Sitemaps>[] = [
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
    name: 'updated',
    label: 'Updated',
    field: 'updated',
    align: 'left',
    format: (value) => new Date(value).toLocaleString(),
    sort: (a, b) => Date.parse(a) - Date.parse(b),
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'url',
    label: 'URL',
    field: 'url',
    align: 'left',
  },
  {
    name: 'domain',
    label: 'Site',
    field: 'domain',
    align: 'left',
    sort: (a, b) => a.localeCompare(b),
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'relative',
    label: 'Pages',
    field: 'relative',
    align: 'center',
    format: (value) => value ?? '0',
  },
  {
    name: 'remote',
    label: 'Links',
    field: 'remote',
    align: 'center',
    format: (value) => value ?? '0',
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'duration',
    label: 'Duration',
    field: 'duration',
    align: 'center',
    format: (value: number) => `${value > 60 ? Math.round(value / 60) : 1}m`,
  },
  {
    name: 'average',
    label: 'Average',
    field: 'average',
    align: 'center',
    format: (value) => `${value}s`,
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'qty',
    label: 'Qty',
    field: 'size',
    align: 'center',
    format: (value) => `${value}`,
  },
];

const dialog = ref<boolean>(false);
const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);
onMounted(async () => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value.filter((s) => s !== 'url');
  await store.load();
});
</script>

<template>
  <SitemapDialog v-model="dialog" />
  <q-table
    :columns="columns"
    :visible-columns="visibleCols"
    :loading="store.loading"
    :pagination="{ sortBy: 'id' }"
    :rows="store.model"
    :table-row-style-fn="() => 'cursor: pointer;'"
    row-key="id"
    :hide-pagination="store.model.length <= 5"
    flat
    dense
  >
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template #top-left>
      <div class="flex justify-center items-center">
        <q-icon name="mdi-sitemap" size="lg" @click="store.load()" />
        <span class="q-mx-sm text-h5">Sitemaps</span>
      </div>
    </template>
    <template #top-right="props">
      <PlusBtn hint="New<br>Sitemap" @click="dialog = true" />
      <MenuBtn icon="mdi-view-column-outline">
        <template #tooltip>
          <x-tooltip text="Columns" />
        </template>
        <template #menu-content>
          <ColumnList v-model="visibleCols" :names="columnNames" />
        </template>
      </MenuBtn>
      <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
    </template>
    <template #body="props">
      <q-tr :props="props" @click="props.expand = !props.expand">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <q-badge v-if="col.name === 'qty'" color="purple" outline>
            <span class="text-white">{{ col.value }}</span>
          </q-badge>
          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0" class="q-ma-xs">
          <SitemapTable :rows="props.row?.sitemaps ?? []" :domain="props.row.domain" />
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
