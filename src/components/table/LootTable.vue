<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { decodeTime } from 'ulid';
import type { Loot, Result, Results } from 'src/types/loot';
import { onMounted, ref } from 'vue';
import ResultTable from 'components/table/ResultTable.vue';
import RowToggle from 'components/btn/toggle/RowToggle.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import MenuList from 'components/list/MenuList.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import DownloadHtmlBtn from 'components/btn/DownloadHtmlBtn.vue';
import ViewJsonBtn from 'components/btn/ViewJsonBtn.vue';

defineProps<{
  rows: Loot[];
}>();

const columns: Array<QTableColumn<Loot>> = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    style: 'width: 0',
  },
  {
    name: 'idx',
    label: 'IDX',
    field: 'idx',
    align: 'left',
    style: 'width: 0',
  },
  {
    name: 'created',
    label: 'Created',
    field: 'idx',
    align: 'left',
    format: (value) => new Date(decodeTime(value)).toLocaleString(),
    sort: (a, b) => decodeTime(a) - decodeTime(b),
    style: 'width: 0',
  },
  {
    name: 'name',
    label: 'Title',
    field: 'name',
    align: 'left',
  },
  {
    name: 'organic',
    label: 'Organic',
    field: 'data',
    align: 'center',
    format: (value: Results) => value?.organic?.length?.toString() ?? '0',
  },
  {
    name: 'sponsored',
    label: 'Sponsored',
    field: 'data',
    align: 'center',
    format: (value: Results) => value?.sponsored?.length?.toString() ?? '0',
  },
  {
    name: 'videos',
    label: 'Videos',
    field: 'data',
    align: 'center',
    format: (value: Results) => value?.videos?.length?.toString() ?? '0',
  },
  {
    name: 'forums',
    label: 'Forums',
    field: 'data',
    align: 'center',
    format: (value: Results) => value?.forums?.length?.toString() ?? '0',
  },
  {
    name: 'articles',
    label: 'Articles',
    field: 'data',
    align: 'center',
    format: (value: Results) => value?.articles?.length?.toString() ?? '0',

  },
  {
    name: 'code',
    label: 'Code',
    field: 'data',
    align: 'center',
    style: 'width: 0',
  },
  {
    name: 'html',
    label: 'Content',
    field: 'html',
    align: 'center',
    style: 'width: 0',
  },
  {
    name: 'image',
    label: 'Image',
    field: 'image',
    align: 'center',
    style: 'width: 0',
  },
];
const expandedCol = ref<string>('');
const expandedRows = ref<Result[]>([]);
const visibleCols = ref<string[]>([]);

const handleExpand = (col?: string, rows?: Result[]) => {
  expandedCol.value = '';
  expandedRows.value = [];
  if (col && rows) {
    expandedCol.value = col;
    expandedRows.value = rows;
  }
};

onMounted(() => visibleCols.value = columns.map((col) => col.name));
</script>

<template>
  <q-table
    :columns="columns"
    :pagination="{ sortBy: 'id', descending: true, rowsPerPage: -1 }"
    :rows="rows"
    :visible-columns="visibleCols"
    hide-pagination
    row-key="id"
    flat
    dense
    class="bg-grey-10"
    wrap-cells
  >
    <template v-slot:top-left>
      <q-icon name="mdi-file-search-outline" size="sm" />
      <span class="text-h6 q-ml-sm q-mt-xs"> Pages </span>
    </template>
    <template v-slot:top-right>
      <MenuBtn icon="mdi-view-column-outline">
        <MenuList v-model="visibleCols" />
      </MenuBtn>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props" >
          <span v-if="col.name === 'html'">
            <DownloadHtmlBtn :url="col.value" />
          </span>
          <span v-else-if="col.name === 'image'">
            <ViewImgBtn :title="props.row?.name" :url="col.value" />
          </span>
          <span v-else-if="col.name === 'code'">
            <ViewJsonBtn :title="props.row?.name" :content="col.value" />
          </span>
          <span v-else-if="col.name.match(/organic|sponsored|videos|forums|articles/)">
            <RowToggle
              :value="col.value"
              :expand="props.expand && col.name === expandedCol"
              @click="
                handleExpand(col.name, props.row?.data?.[col.name]);
                props.expand = !props.expand;
              "
            />
          </span>
          <span v-else>
            {{ col.value }}
          </span>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <ResultTable :name="expandedCol" :rows="expandedRows" class="q-ma-md"/>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
