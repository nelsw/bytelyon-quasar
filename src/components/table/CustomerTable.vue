<script setup lang="ts">
import { ref } from 'vue';
import FilterInput from 'components/input/FilterInput.vue';
import { type Customer } from 'src/types/model';
import { At, Money, Phone } from 'src/types/base';
import type { QTableColumn } from 'quasar';

defineProps<{
  busy: boolean;
}>();

const columns: QTableColumn[] = [
  {
    name: 'ordered',
    label: 'Ordered',
    field: 'ordered',
    align: 'left',
    format: At,
  },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'phone', label: 'Phone', field: 'phone', align: 'left', format: Phone },
  { name: 'city', label: 'City', field: 'city', align: 'left' },
  { name: 'state', label: 'State', field: 'state', align: 'left' },
  { name: 'orders', label: 'Orders', field: 'orders', align: 'center' },
  { name: 'spent', label: 'Spent', field: 'spent', align: 'right', format: Money, sortable: true },
];

const model = defineModel<Customer[]>({ required: true });
const filter = ref<string>('');
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="busy"
    :pagination="{ sortBy: 'spent', descending: true }"
    :rows-per-page-options="[10, 25, 50, 100, 0]"
    :rows="model"
    color="primary"
    row-key="id"
    rowsPerPageLabel="Customers per page"
    binary-state-sort
    dense
    flat
  >
    <template #top-left>
      <FilterInput v-model="filter" placeholder="Filter Customers" />
    </template>
  </q-table>
</template>
