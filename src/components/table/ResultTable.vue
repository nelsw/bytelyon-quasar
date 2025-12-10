<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { computed } from 'vue';
import { truncateString } from 'src/types/base';
import { type Result } from 'src/types/result';

const props = defineProps<{
  name: string;
  rows: Result[];
}>();

const columns = computed((): QTableColumn<Result>[] => {
  if (props.name === 'Articles') {
    return [
      {
        name: 'position',
        label: 'Pos.',
        field: 'position',
        align: 'center',
        format: (value: number) => (value + 1).toString(),
        style: 'width: 0;',
      },
      {
        name: 'title',
        label: 'Title',
        field: 'title',
        align: 'left',
        style: 'width: 0;',
      },

    ];
  } else if (props.name === 'Forums') {
    return [
      {
        name: 'position',
        label: 'Pos.',
        field: 'position',
        align: 'center',
        format: (value: number) => (value + 1).toString(),
        style: 'width: 0;',
      },
      {
        name: 'snippet',
        label: 'Source',
        field: 'snippet',
        align: 'left',
        style: 'width: 0;',
      },
      {
        name: 'title',
        label: 'Title',
        field: 'title',
        align: 'left',
      },

    ];
  } else if (props.name === 'Sponsored') {
    return [
      {
        name: 'position',
        label: 'Pos.',
        field: 'position',
        align: 'center',
        format: (value: number) => (value + 1).toString(),
        style: 'width: 0;',
      },
      {
        name: 'source',
        label: 'Source',
        field: 'source',
        align: 'left',
        style: 'width: 0;',
      },
      {
        name: 'title',
        label: 'Title',
        field: 'title',
        align: 'left',
      },
    ];
  }
  return [
    {
      name: 'position',
      label: 'Pos.',
      field: 'position',
      align: 'center',
      format: (value: number) => (value + 1).toString(),
      style: 'width: 0;',
    },
    {
      name: 'source',
      label: 'Source',
      field: 'source',
      align: 'left',
      style: 'width: 0;',
    },
    {
      name: 'title',
      label: 'Title',
      field: 'title',
      align: 'left',
      style: 'width: 0;',
    },
    {
      name: 'snippet',
      label: 'Snippet',
      field: 'snippet',
      align: 'left',
    },
  ];
})
const handleClick = (r: Result) => window.open(r.link, '_blank');
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
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="handleClick(props.row)">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <span v-if="col.name === 'position'">
            <q-badge color="indigo" :label="col.value" />
          </span>
          <span v-else-if="col.name === 'title'">
            {{ truncateString(col.value, 150) }}
          </span>
          <span v-else-if="col.name === 'snippet'">
            {{ truncateString(col.value, 150) }}
          </span>
          <span v-else>
            {{col.value}}
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
