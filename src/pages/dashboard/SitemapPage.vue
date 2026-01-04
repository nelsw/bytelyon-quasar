<script setup lang="ts">
import { useBotStore } from 'stores/bot-store';
import { computed } from 'vue';
import UrlTabs from 'components/tabs/UrlTabs.vue';

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
  <UrlTabs v-if="id && date" :pages="node.data[0].relative" :links="node.data[0].remote" />
</template>
