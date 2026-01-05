<script setup lang="ts">
import type { Result } from 'src/types/result';
import { SitemapColor } from 'src/types/base';
import { useFilterStore } from 'stores/filter-store';

defineProps<{
  rows: string[];
}>();

const store = useFilterStore();

const handleClick = (r: Result) => window.open(r.link, '_blank');
</script>

<template>
  <q-table
    :rows="rows"
    :filter="store.model"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    :rows-per-page-options="[20, 50, 100, 0]"
    :color="SitemapColor"
    hide-header
    dense
    flat
  >
    <template #header>
      <q-tr>
        <q-th style="text-align: left"> URL </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props" @click="handleClick">
        <q-td colspan="1" style="text-align: left">
          <span class="text-caption">
            {{ props.row }}
          </span>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
