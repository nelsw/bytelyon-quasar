<script setup lang="ts">
import { useNewsStore } from 'stores/news-store';
import { onMounted, ref } from 'vue';
import { type QTableColumn } from 'quasar';
import { type News } from 'src/types/news';
import PlusButton from 'components/btn/PlusButton.vue';
import ArticleTable from 'components/table/ArticleTable.vue';
import { decodeTime } from 'ulid';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import { type Article } from 'src/types/article';
import XTooltip from 'components/tooltip/XTooltip.vue';
import MenuList from 'components/list/MenuList.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';

const store = useNewsStore();
const visibleCols = ref<string[]>([]);
const columns: QTableColumn<News>[] = [
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
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'keywords',
    label: 'Keywords',
    field: 'keywords',
    align: 'left',
  },
  {
    name: '$',
    label: '',
    field: 'id',
    style: 'width: 20%;',
  },
  {
    name: 'articles',
    label: 'Articles',
    field: 'articles',
    align: 'center',
    format: (value: Article[]) => (value?.length ?? 0).toString(),
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

onMounted(async () => {
  visibleCols.value = columns.map((col) => col.name);
  await store.load();
});
</script>

<template>
  <q-table
    :columns="columns"
    :loading="store.loading"
    :pagination="{ sortBy: 'id', descending: true }"
    :rows="store.model"
    :visible-columns="visibleCols"
    row-key="id"
    flat
    dense
    :table-row-style-fn="() => `cursor: pointer;`"
  >
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template #top-left>
      <div class="flex justify-center items-center">
        <q-icon name="mdi-newspaper" size="lg" @click="store.load()" />
        <span class="q-mx-sm text-h5">News</span>
      </div>
    </template>
    <template #top-right="props">
      <div class="flex justify-center items-center q-gutter-xs">
        <PlusButton hint="New Feed" />
        <MenuBtn icon="mdi-view-column-outline">
          <template #tooltip>
            <x-tooltip text="Columns" />
          </template>
          <template #menu-content>
            <MenuList v-model="visibleCols" />
          </template>
        </MenuBtn>
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </div>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          @click="col.name === 'actions' ? () => {} : (props.expand = !props.expand)"
        >
          <div v-if="col.name === 'actions'">
            <DeleteBtn :id="props.row.id" />
          </div>
          <span v-else-if="col.name === 'keywords'">
            <q-chip
              v-for="(label, key) in props.row.keywords"
              :key="key"
              :label="label"
              color="primary"
              dense
              outline
              square
              size="sm"
            />
          </span>

          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <ArticleTable :rows="props.row.articles ?? []" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <pre>{{ store.model }}</pre>
</template>
<style lang="scss" scoped>
.q-table tbody tr:hover {
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
.q-table tbody tr:hover {
  background-color: #37474f  !important;
}
</style>
