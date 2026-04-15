<script setup lang="ts">
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import NewsTable from 'components/table/NewsTable.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
const botId = computed(() => $route.params.botId as string)
</script>

<template>
  <ShopifyDialog />
  <div class="q-pa-md">
    <NewsTable :botId="botId"/>
  </div>
</template>
