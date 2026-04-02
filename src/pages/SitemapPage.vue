<script setup lang="ts">
import type { BotNode, SitemapRow } from 'src/types/model';
import { useRouter } from 'vue-router';
import { useDataStore } from 'stores/data-store';
import SitemapTable from 'components/table/SitemapTable.vue';

const props = defineProps<{
  node: BotNode;
}>();

const $router = useRouter();
const $store = useDataStore();

const onDelete = async () => {
  await $store.Delete(props.node.type, props.node.target, props.node.botId, props.node.id, true);
  await $router.push('/dashboard');
};
</script>

<template>
  <SitemapTable
    @delete="onDelete"
    :rows="node.rows as Array<SitemapRow>"
    :bot-label="node?.label || ''"
    :result-label="node?.children?.[0]?.label || ''"
  />
</template>
