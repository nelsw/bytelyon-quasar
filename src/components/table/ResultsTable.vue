<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { computed } from 'vue';
import { type Result } from 'src/types/result';
import type { ProwlerSearchPageResult } from 'src/types/prowler';

const props = defineProps<{
  name: string;
  rows: ProwlerSearchPageResult[];
}>();

const columns = computed((): QTableColumn<ProwlerSearchPageResult>[] => {
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
  ];
});
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
    wrap-cells
    hide-header
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="handleClick(props.row)">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <span v-if="col.name === 'position'">
            <q-badge color="indigo-12" outline>
              <span class="text-white">
                {{ col.value }}
              </span>
            </q-badge>
          </span>
          <span v-else class="text-caption">
            {{ col.value }}
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
