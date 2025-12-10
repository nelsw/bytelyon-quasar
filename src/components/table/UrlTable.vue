<script setup lang="ts">
import { ref } from 'vue';
import type { Result } from 'src/types/result';
import { truncateString } from 'src/types/base';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
defineProps<{
  rows: string[];
}>();
const filter = ref<string>('');
const handleClick = (r: Result) => window.open(r.link, '_blank');

</script>

<template>
  <q-table
    :rows="rows"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    :rows-per-page-options="[1000]"
    dense
    flat
    hide-pagination
  >
    <template #top="props">
      <q-input
        v-model="filter"
        debounce="300"
        color="primary"
        label="Filter URLs"
        name="filter"
        dense
      >
        <template #prepend>
          <q-icon name="mdi-filter" size="sm" />
        </template>
      </q-input>
      <q-space />
      <div class="q-gutter-x-xs" v-if="rows.length > 1000">
        <q-btn
          v-if="props.pagesNumber > 2"
          icon="mdi-page-first"
          color="grey-8"
          size="sm"
          dense
          flat
          :disable="props.isFirstPage"
          @click="props.firstPage"
        />
        <q-btn
          icon="mdi-chevron-left"
          color="grey-8"
          size="sm"
          dense
          flat
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <q-badge color="primary" class="q-mx-xs" dense >
          <span>
            {{props.pagination.page}}
          </span>
        </q-badge>
        /
        <q-badge color="primary" class="q-mx-xs" dense outline>
          <span class="text-white">{{props.pagesNumber}}</span>
        </q-badge>
        <q-btn
          icon="mdi-chevron-right"
          color="grey-8"
          size="sm"
          dense
          flat
          :disable="props.isLastPage"
          @click="props.nextPage"
        />
        <q-btn
          v-if="props.pagesNumber > 2"
          icon="mdi-page-last"
          color="grey-8"
          size="sm"
          dense
          flat
          :disable="props.isLastPage"
          @click="props.lastPage"
        />
      </div>
      <q-space />
      <div>
        <FullScreenBtn :fullscreen="props.inFullscreen" @click="props.toggleFullscreen" />
      </div>
    </template>
    <template #header>
      <q-tr>
        <q-th style="text-align: left"> # </q-th>
        <q-th style="text-align: left"> URL </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props" @click="handleClick">
        <q-td colspan="1" style="width: 12px">
          {{ props.rowIndex + 1 }}
        </q-td>
        <q-td colspan="1" style="text-align: left">
          {{ truncateString(props.row, 200) }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
