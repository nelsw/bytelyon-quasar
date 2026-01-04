<script setup lang="ts">
import { ref } from 'vue';
import type { Result } from 'src/types/result';
import { SitemapColor, truncateString } from 'src/types/base';
import FilterInput from 'components/form/FilterInput.vue';

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
    :rows-per-page-options="[25]"
    :hide-pagination="rows.length < 26"
    dense
    flat
  >
    <template #top="scope">
      <div class="flex justify-between items-center q-gutter-lg">
        <div>
          <FilterInput v-model="filter" :color="SitemapColor" :label="`URLs (${rows.length})`" />
        </div>

        <div v-if="scope.pagesNumber > 1">
          <div class="flex justify-center items-center">
            <q-btn
              icon="mdi-chevron-left"
              :color="SitemapColor"
              dense
              flat
              :disable="scope.isFirstPage"
              @click="scope.prevPage"
              size="sm"
            />
            <span class="text-caption">
              {{ scope.pagination.page }}
              <span class="text-grey">/</span>
              {{ scope.pagesNumber }}
            </span>
            <q-btn
              icon="mdi-chevron-right"
              dense
              flat
              :disable="scope.isLastPage"
              @click="scope.nextPage"
              size="sm"
              :color="SitemapColor"
            />
          </div>
        </div>
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
