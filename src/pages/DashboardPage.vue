<script setup lang="ts">
import SitemapsTable from 'components/table/SitemapsTable.vue';
import NewsTable from 'components/table/NewsTable.vue';
</script>

<template>
  <div class="row q-pa-md">
    <div class="col-12">
      <SitemapsTable />
    </div>
    <div class="col-12 q-pt-md">
      <NewsTable />
    </div>
  </div>
</template>
