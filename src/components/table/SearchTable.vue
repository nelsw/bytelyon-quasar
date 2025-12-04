<script setup lang="ts">
import { usePlunderStore } from 'stores/plunder-store';
import { onMounted, ref } from 'vue';
import { type QTableColumn } from 'quasar';
import { type Plunder } from 'src/types/plunder';
import { decodeTime } from 'ulid';
import { type Loot } from 'src/types/loot';
import DeleteBtn from 'components/btn/DeleteBtn.vue';
import RowToggle from 'components/btn/toggle/RowToggle.vue';
import LootTable from 'components/table/LootTable.vue';
import FullScreenBtn from 'components/btn/FullScreenBtn.vue';
import MenuList from 'components/list/MenuList.vue';
import MenuBtn from 'components/btn/MenuBtn.vue';
import JobBtn from 'components/btn/JobBtn.vue';
import { JobType } from 'src/types/job';

const store = usePlunderStore();
const rowToDelete = ref<string>('');
const rowStyleFn = (id: Plunder): string =>
  rowToDelete.value === id.id ? 'background-color:#f23d4c;' : '';
const columns: Array<QTableColumn<Plunder>> = [
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
    name: 'query',
    label: 'Query',
    field: 'target',
    align: 'left',
  },
  {
    name: 'follow',
    label: 'Follow',
    field: 'follow',
    align: 'left',
    format: (value) => value.join(','),
  },
  {
    name: 'loot',
    label: 'Pages',
    field: 'loot',
    align: 'center',
    format: (value: Loot[]) => value.length.toString(),
  },
  {
    name: 'schedule',
    label: 'Schedule',
    field: 'id',
    align: 'center',
    style: 'width: 0',
  },
  {
    name: 'delete',
    label: 'Delete',
    field: 'id',
    align: 'center',
    style: 'width: 0',
  },
];
const visibleCols = ref<string[]>([]);

onMounted(async () => {
  for (const column of columns) {
    visibleCols.value.push(column.name);
  }
  await store.load();
});
</script>

<template>
  <q-table
    :columns="columns"
    :loading="store.loading"
    :pagination="{ sortBy: 'id', descending: true }"
    :rows="store.model"
    :visible-columns="visibleCols"
    :table-row-style-fn="rowStyleFn"
    row-key="id"
    flat
    dense
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:top-left>
      <div class="flex justify-center q-gutter-sm">
        <q-icon name="mdi-search-web" size="md" />
        <div class="text-h5">Search</div>
      </div>
    </template>
    <template v-slot:top-right="props">
      <MenuBtn icon="mdi-view-column-outline">
        <MenuList v-model="visibleCols" />
      </MenuBtn>
      <FullScreenBtn
        class="q-ml-sm"
        :fullscreen="props.inFullscreen"
        @click="props.toggleFullscreen"
      />
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" no-hover>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <span v-if="col.name === 'loot'">
            <RowToggle
              size="sm"
              :value="col.value"
              :expand="props.expand"
              @click="props.expand = !props.expand"
            />
          </span>
          <span v-else-if="col.name === 'schedule'">
            <JobBtn
              :id="props.row.id"
              :type="JobType.PLUNDER"
            />
          </span>
          <span v-else-if="col.name === 'delete'">
            <DeleteBtn
              :id="props.row.id"
              @select="(s: string) => (rowToDelete = s)"
              @cancel="rowToDelete = ''"
              @delete="rowToDelete = ''"
            />
          </span>
          <span v-else>
            {{ col.value }}
          </span>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%" style="padding: 0">
          <LootTable :rows="props.row?.loot" class="q-ma-md" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
