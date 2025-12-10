<script setup lang="ts">
import SitemapsTable from 'components/table/SitemapsTable.vue';
import SearchTable from 'components/table/SearchTable.vue';
import NewzTable from 'components/table/NewzTable.vue';
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <div class="col-12">
        <SearchTable />
      </div>
      <div class="col-12">
        <SitemapsTable />
      </div>
      <div class="col-12">
        <NewzTable />
      </div>
    </div>
  </q-page>
</template>
