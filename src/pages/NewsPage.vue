<script setup lang="ts">
import { useNewsStore } from 'stores/news-store';
import { onMounted } from 'vue';

const store = useNewsStore();
onMounted(store.fetch)
</script>

<template>
  <div class="row q-pa-md">
    <div class="col-12">
      <pre>{{store.items}}</pre>
    </div>
  </div>
</template>
