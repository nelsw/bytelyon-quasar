<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBotStore } from 'stores/bot-store';
import { decodeTime } from 'ulid';
import { useFilterStore } from 'stores/filter-store';
import { NewsColor } from 'src/types/base';
interface Row {
  id: string;
  url: string;
  title: string;
  source: string;
}
const props = defineProps<{
  id?: string;
  date?: string;
}>();
const loading = ref(false);
const store = useBotStore();
const filterStore = useFilterStore();
const node = computed(() => {
  return store.find('news', props.id, props.date) ?? {};
});
const onDelete = async (row: Row) => {
  loading.value = true;
  const ok = await store.Delete(row.id);
  if (ok) {
    const rows = node.value.data;
    rows.splice(rows.indexOf(row), 1);
  }
  loading.value = false;
};
</script>

<template>
  <div class="scroll" style="max-height: 95vh">
    <q-table
      v-if="id && date"
      :loading="loading"
      :color="NewsColor"
      :rows="node.data"
      :rows-per-page-options="[10, 20, 50, 100, 0]"
      :pagination="{ sortBy: 'id' }"
      :filter="filterStore.model"
      :columns="[
        {
          name: 'id',
          label: 'Published',
          field: 'id',
          align: 'left',
          format: (value) => new Date(decodeTime(value)).toLocaleString(),
          sort: (_a, _b, rowA, rowB) => (decodeTime(rowA.id) > decodeTime(rowB.id) ? 1 : -1),
          sortable: true,
        },
        {
          name: 'source',
          label: 'Source',
          field: 'source',
          align: 'left',
          sort: (a, b) => a.localeCompare(b),
          sortable: true,
        },
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left',
        },
        {
          name: 'delete',
          label: '',
          field: 'id',
          align: 'right',
        },
      ]"
      row-key="id"
      dense
      flat
      binary-state-sort
      virtual-scroll
    >
      <template #body-cell-delete="props">
        <q-td :props="props">
          <q-btn
            color="red-13"
            dense
            flat
            size="sm"
            icon="mdi-delete"
            @click="onDelete(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
