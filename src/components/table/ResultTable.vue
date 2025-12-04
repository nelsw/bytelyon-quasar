<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { Result } from 'src/types/loot';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { computed } from 'vue';
import { titleCase, truncateString } from 'src/types/base';

const props = defineProps<{
  name: string;
  rows: Result[];
}>();

const tableName = computed(() => `${titleCase(props.name)} Results`)
const tableIcon = computed(() => {
  switch (props.name) {
    case 'organic':
      return 'mdi-leaf-circle-outline'
    case 'sponsored':
      return 'mdi-credit-card-search-outline'
    case 'videos':
      return 'mdi-movie-search-outline'
    case 'forums':
      return 'mdi-comment-search-outline'
    case 'articles':
      return 'mdi-book-search-outline'
    default:
      return 'mdi-file-search-outline'
  }
})
const columns: Array<QTableColumn<Result>> = [
  {
    name: 'position',
    label: '#',
    field: 'position',
    align: 'center',
    format: (value: number) => (value + 1).toString(),
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
    name: 'snippet',
    label: 'Snippet',
    field: 'snippet',
    align: 'left',
  },
  {
    name: 'link',
    label: 'Link',
    field: 'link',
    align: 'center',
  },
];
</script>

<template>
  <q-table
    hide-pagination
    :columns="columns"
    :pagination="{ sortBy: 'position', rowsPerPage: -1 }"
    :rows="rows"
    row-key="position"
    dense
    flat
    wrap-cells
  >
    <template v-slot:top-left>
      <q-icon :name="tableIcon" size="xs" />
      <span > {{tableName}} </span>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props" auto-width>
          <span v-if="col.name === 'link'">
            <OpenInNewBtn :url="col.value" />
          </span>
          <span v-else-if="col.name === 'title'">
            {{ truncateString(col.value, 75) }}
          </span>
          <span v-else>
            {{ truncateString(col.value, 100) }}
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
