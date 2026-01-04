<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useBotStore } from 'stores/bot-store';
import { decodeTime } from 'ulid';
import FilterInput from 'components/form/FilterInput.vue';

const props = defineProps<{
  id?: string;
  date?: string;
}>();

const store = useBotStore();
const router = useRouter();
const color = computed(() => router.currentRoute.value.meta?.['color'] as string);
const filter = ref<string>('');
const node = computed(() => {
  return store.find('news', props.id, props.date) ?? {};
});
</script>

<template>
  <q-table
    v-if="id && date"
    title="farts"
    hide-bottom
    :rows="node.data"
    :rows-per-page-options="[25]"
    :pagination="{ sortBy: 'id' }"
    :filter="filter"
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
    ]"
    row-key="id"
    dense
    flat
    binary-state-sort
    virtual-scroll
  >
    <template #top="scope">
      <div class="flex justify-between items-center q-gutter-lg">
        <div>
          <FilterInput v-model="filter" :color="color" :label="`Articles (${node.data.length})`" />
        </div>

        <div v-if="scope.pagesNumber > 1">
          <div class="flex justify-center items-center">
            <q-btn
              icon="mdi-chevron-left"
              :color="color"
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
              :color="color"
            />
          </div>
        </div>
      </div>
    </template>
  </q-table>
</template>
