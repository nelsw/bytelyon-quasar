<script setup lang="ts">
import { ref } from 'vue';
import FilterInput from 'components/input/FilterInput.vue';
import { type Order } from 'src/types/model';
import { At, Money } from 'src/types/base';
import { type QTableColumn } from 'quasar';

defineProps<{
  busy: boolean;
}>();

const model = defineModel<Order[]>({ required: true });
const filter = ref<string>('');
const columns: QTableColumn[] = [
  {
    name: 'createdAt',
    label: 'Created',
    field: 'createdAt',
    align: 'left',
    sortable: true,
    format: At,
  },
  { name: 'customer', label: 'Customer', field: 'customer', align: 'left' },
  { name: 'items', label: 'Items', field: 'items', align: 'left' },
  { name: 'refunded', label: 'Refund', field: 'refunded', format: Money },
  { name: 'discounts', label: 'Discount', field: 'discounts', format: Money },
  { name: 'shipping', label: 'Shipping', field: 'price', format: Money },
  { name: 'price', label: 'Total', field: 'price', format: Money, sortable: true },
];
</script>

<template>
  <q-table
    :columns="columns"
    :filter="filter"
    :loading="busy"
    :pagination="{ sortBy: 'createdAt', descending: true }"
    :rows-per-page-options="[10, 25, 50, 100, 0]"
    :rows="model"
    color="primary"
    row-key="id"
    rowsPerPageLabel="Orders per page"
    binary-state-sort
    dense
    flat
  >
    <template #top-left>
      <FilterInput v-model="filter" placeholder="Filter Orders" />
    </template>
    <template #body-cell-items="props">
      <q-td :props="props">
        <span v-for="(item, idx) in props.value" :key="item.id" class="q-mr-sm">
          <span v-if="idx > 0" class="q-mr-sm"> + </span>
          <q-badge color="green" text-color="white" outline>
            <span class="text-white">
              {{ item.quantity }}
            </span>
          </q-badge>
          <span class="q-mx-xs">
            {{ item.name }}
          </span>
          <q-badge color="green" text-color="dark">
            {{ Money(item.price) }}
          </q-badge>
        </span>
      </q-td>
    </template>
  </q-table>
</template>
