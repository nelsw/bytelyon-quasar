<script setup lang="ts">
import { type Article } from 'src/types/article';
import { onMounted, ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { decodeTime } from 'ulid';
import DeleteBtn from 'components/btn/DeleteBtn.vue';

defineProps<{
  rows: Article[];
}>();

const filter = ref<string>('');
const handleClick = (a: Article) => window.open(a.url, '_blank');
const visibleCols = ref<string[]>([]);
const columns: QTableColumn<Article>[] = [
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
    name: 'time',
    label: 'Published',
    field: 'time',
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
    name: 'source',
    label: 'Source',
    field: 'source',
    align: 'left',
  },

  {
    name: 'title',
    label: 'Title',
    field: 'title',
    align: 'left',
  },
  {
    name: 'url',
    label: 'URL',
    field: 'url',
    align: 'left',
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
onMounted(() => {
  visibleCols.value = columns.filter(col => col.name !== 'url').map((col) => col.name)
});
</script>

<template>
  <q-table
    :visible-columns="visibleCols"
    :pagination="{ sortBy: 'id', descending: true }"
    :columns="columns"
    :rows="rows"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    row-key="id"
    dense
    flat
    class="q-ma-sm"
  >
    <template #body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          @click="handleClick(props.row)"
        >
          <div v-if="col.name === 'actions'">
            <DeleteBtn :id="props.row.id" />
          </div>


          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
