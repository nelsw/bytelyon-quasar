<script setup lang="ts">
import { useNewsStore } from 'stores/news-store';
import { onMounted, ref } from 'vue';
import { type QTableColumn } from 'quasar';
import { type News } from 'src/types/news';
import PlusButton from 'components/btn/PlusButton.vue';

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
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'keywords',
    label: 'Keywords',
    field: 'keywords',
    align: 'left',
  },
];

onMounted(async () => {
  for (const column of columns) {
    visibleCols.value.push(column.name);
  }
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
    <template #top-right>
      <div class="flex justify-center items-center q-gutter-xs">
        <PlusButton name="Search" />
      </div>
    </template>
    <template #body="props">
      <q-tr :props="props" no-hover>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <span v-if="col.name === 'keywords'">
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

          <span v-else>
            {{ col.value }}
          </span>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0"> </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
