<script setup lang="ts">
import { useBotStore } from 'stores/bot-store';
import { computed } from 'vue';
import UrlTable from 'components/table/UrlTable.vue';

const props = defineProps<{
  id?: string;
  date?: string;
}>();
const store = useBotStore();
const node = computed(() => {
  return store.find('sitemap', props.id, props.date) ?? {};
});
</script>

<template>
  <UrlTable v-if="id && date" :rows="node.data.relative" />
</template>
