<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlunderStore } from 'stores/plunder-store';
import SearchTable from 'components/table/SearchTable.vue';

const store = usePlunderStore();
onMounted(store.load);
</script>

<template>
  <q-page padding>
    <div>
      <SearchTable />
    </div>
  </q-page>
</template>
