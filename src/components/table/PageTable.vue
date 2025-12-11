<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { decodeTime } from 'ulid';
import { onMounted, ref } from 'vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import MenuList from 'components/list/MenuList.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import DownloadHtmlBtn from 'components/btn/DownloadHtmlBtn.vue';
import ViewJsonBtn from 'components/btn/ViewJsonBtn.vue';
import { type Page } from 'src/types/page';
import { type Results, ResultsLength, ResultType } from 'src/types/results';
import XTooltip from 'components/tooltip/XTooltip.vue';
import ResultTabs from 'components/tabs/ResultTabs.vue';

defineProps<{
  rows: Page[];
}>();

const columns: QTableColumn<Page>[] = [
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
    name: 'title',
    label: 'Title',
    field: 'title',
    align: 'left',
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'organic',
    label: 'Organic',
    field: 'results',
    align: 'center',
    format: (value?: Results) => ResultsLength(ResultType.ORGANIC, value).toString(),
  },
  {
    name: 'sponsored',
    label: 'Sponsored',
    field: 'results',
    align: 'center',
    format: (value?: Results) => ResultsLength(ResultType.SPONSORED, value).toString(),
  },
  {
    name: 'videos',
    label: 'Videos',
    field: 'results',
    align: 'center',
    format: (value?: Results) => ResultsLength(ResultType.VIDEOS, value).toString(),
  },
  {
    name: 'forums',
    label: 'Forums',
    field: 'results',
    align: 'center',
    format: (value?: Results) => ResultsLength(ResultType.FORUMS, value).toString(),
  },
  {
    name: 'articles',
    label: 'Articles',
    field: 'results',
    align: 'center',
    format: (value?: Results) => ResultsLength(ResultType.ARTICLES, value).toString(),
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
    align: 'center',
    style: 'width: 0;',
  },
];

const columnNames = ref<string[]>([]);
const visibleCols = ref<string[]>([]);
onMounted(() => {
  columnNames.value = columns.map((col) => col.name);
  visibleCols.value = columnNames.value.filter((s) => s !== 'url');
});
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
        <template #tooltip>
          <x-tooltip text="Columns" />
        </template>
        <template #menu-content>
          <MenuList v-model="visibleCols" :names="columnNames" />
        </template>
      </MenuBtn>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          @click="props.expand = !props.expand"
        >
          <div v-if="col.name === 'actions'">
            <ViewJsonBtn :title="props.row?.title" :content="props.row.results" />
            <ViewImgBtn :title="props.row?.title" :url="props.row.screenshot" />
            <DownloadHtmlBtn :url="props.row.content" />
          </div>
          <q-badge
            v-else-if="col.name.match(/organic|sponsored|videos|forums|articles/)"
            color="purple"
            :label="col.value"
          />

          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <ResultTabs :results="props.row.results" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<style lang="scss" scoped></style>
