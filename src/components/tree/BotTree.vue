<script setup lang="ts">
import { QTree, type QTreeNode } from 'quasar';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import type { Bot, BotTable } from 'src/types/model';
import { useLogger } from 'src/composable/useLogger';
import { useNodeStore } from 'stores/node-store';

const emit = defineEmits<{
  'update:bot': [Bot];
  'update:data': [BotTable<unknown>];
}>();

const $log = useLogger();
const $nodes = useNodeStore();

const filter = defineModel<string>('filter');
const selected = defineModel<string>('selected');
const treeRef = useTemplateRef<QTree>('my-tree');
const loading = ref(true);

onMounted(async () => {
  await $nodes.Load();
  loading.value = false;
});

watch(selected, (val) => {
  filter.value = '';
  treeRef.value?.setExpanded(val, true);
  const node: QTreeNode | undefined = treeRef.value?.getNodeByKey(val);
  $log.debug(node, 'BotTree - watch selected');
  if (node?.data !== undefined) {
    emit('update:data', node?.data);
  } else if (node?.bot !== undefined) {
    emit('update:bot', node?.bot);
  }
});
watch(filter, (val) => {
  if (val === null) {
    treeRef.value?.collapseAll();
    treeRef.value?.setExpanded(selected.value, true);
  } else {
    treeRef.value?.expandAll();
  }
});
</script>

<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear>
    <q-tree
      v-if="!loading"
      ref="my-tree"
      class="q-pa-md"
      :nodes="$nodes.model"
      :filter="filter"
      node-key="id"
      selected-color="primary"
      v-model:selected="selected"
      accordion
      no-selection-unset
      @lazy-load="$nodes.LazyLoad"
    />
  </transition>
</template>
