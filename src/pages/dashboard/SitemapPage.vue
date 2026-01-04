<script setup lang="ts">
import { useBotStore } from 'stores/bot-store';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import FilterInput from 'components/form/FilterInput.vue';

const props = defineProps<{
  id?: string;
  date?: string;
}>();
const store = useBotStore();
const router = useRouter();
const color = computed(() => router.currentRoute.value.meta?.['color'] as string);
const node = computed(() => {
  return store.find('sitemap', props.id, props.date) ?? {};
});
const filter = ref<string>('');
</script>

<template>
  <q-table
    v-if="id && date"
    hide-bottom
    :rows="node.data[0].relative"
    :rows-per-page-options="[25]"
    :pagination="{ sortBy: 'id' }"
    :filter="filter"
    :filter-method="(rows, terms) => rows.filter((row) => row.includes(terms))"
    dense
    flat
    binary-state-sort
    virtual-scroll
  >
    <template #top="scope">
      <div class="flex justify-between items-center q-gutter-lg">
        <div>
          <FilterInput
            v-model="filter"
            :color="color"
            :label="`URLs (${node.data[0].relative.length})`"
          />
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
    <template #header>
      <q-tr>
        <q-th style="text-align: left"> URL </q-th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td colspan="1" style="text-align: left">
          {{ props.row }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
