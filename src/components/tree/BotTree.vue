<script setup lang="ts">
import { QTree, type QTreeNode } from 'quasar';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import type { Bot, BotTable } from 'src/types/model';
import FilterInput from 'components/input/FilterInput.vue';
import { useLogger } from 'src/composable/useLogger';
import { useNodeStore } from 'stores/v2/node-store';

const emit = defineEmits<{
  'update:bot': [Bot];
  'update:data': [BotTable];
}>();

const $log = useLogger();
const $store = useNodeStore();

const selected = defineModel<string>('selected');
const treeRef = useTemplateRef<QTree>('my-tree');
const loading = ref(true);
const filter = ref<string>('');

const onSelect = (nodeKey: string) => {
  $log.debug(nodeKey, 'onSelect');

  const node: QTreeNode | undefined = treeRef.value?.getNodeByKey(nodeKey);
  if (node === undefined) return;
  $log.debug(node, 'onSelect');
  treeRef.value?.setExpanded(nodeKey, true);

  if (node.data !== undefined) {
    emit('update:data', node.data);
  } else if (node.bot !== undefined) {
    emit('update:bot', node.bot);
  }
};

onMounted(async () => {
  await $store.Load();
  loading.value = false;
});

watch(selected, (val) => {
  if (val === '') {
    treeRef.value?.collapseAll();
  } else {
    treeRef.value?.setExpanded(val, true);
  }
});
watch(filter, (val) => {
  if (val === '' || val === null) {
    treeRef.value?.collapseAll();
  } else {
    treeRef.value?.expandAll();
  }
});
</script>

<template>
  <FilterInput v-model="filter" />
  <q-separator inset />
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-tree
      ref="my-tree"
      class="q-pa-md"
      :nodes="$store.model"
      :filter="filter"
      node-key="id"
      selected-color="primary"
      v-model:selected="selected"
      accordion
      no-selection-unset
      @update:selected="onSelect"
      @lazy-load="$store.LazyLoad"
    />
  </transition>
  <q-inner-loading
    :showing="loading"
    label="Loading Bots ..."
    label-class="primary"
    transition-hide="fade"
    transition-show="fade"
  />
</template>

<style lang="scss">
.q-tree > div:nth-child(1) > div:nth-child(1) > i:nth-child(2) {
  display: none !important;
}
.q-tree > div:nth-child(2) > div:nth-child(1) > i:nth-child(2) {
  display: none !important;
}
.q-tree > div:nth-child(3) > div:nth-child(1) > i:nth-child(2) {
  display: none !important;
}
.q-tree > .q-tree__node--child > .q-tree__node-header {
  //padding-left: 4px !important;
}
.q-tree__node--parent > .q-tree__node-header::before {
  //left: -13px;
}
</style>
