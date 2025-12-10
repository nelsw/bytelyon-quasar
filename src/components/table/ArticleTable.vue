<script setup lang="ts">
import { type Article } from 'src/types/article';
import { onMounted, ref } from 'vue';
import type { QTableColumn } from 'quasar';
import { decodeTime } from 'ulid';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import { useArticleStore } from 'stores/article-store';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
const emit = defineEmits<{
  load: [void];
}>();
const props = defineProps<{
  rows: Article[];
  news: string;
}>();
const store = useArticleStore();
const filter = ref<string>('');
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
  store.loading = false;
});
const handleDelete = async (id: string) => {
  const ok = await store.remove(props.news, id)
  if (ok) {
    emit('load')
  }
}
</script>

<template>
  <q-table
    :visible-columns="visibleCols"
    :pagination="{ sortBy: 'id', descending: true }"
    :columns="columns"
    :rows="rows"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    :loading="store.loading"
    row-key="id"
    dense
    flat
    class="q-ma-sm"
  >
    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template #top>
      <q-input
        v-model="filter"
        debounce="300"
        color="primary"
        label="Filter Articles"
        name="filter"
        dense
      >
        <template #prepend>
          <q-icon name="mdi-filter" size="sm" />
        </template>
      </q-input>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <div v-if="col.name === 'actions'">
            <OpenInNewBtn :url="props.row.url" />
            <DeleteBtn @delete="handleDelete(props.row.id)" />
          </div>
          <span v-else-if="col.name !== '$'" v-html="col.value" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
