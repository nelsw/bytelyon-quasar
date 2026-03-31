<script setup lang="ts">
import { QTree } from 'quasar';
import { ref, useTemplateRef, watch } from 'vue';
import type { BotNode } from 'src/types/model';
import FilterInput from 'components/input/FilterInput.vue';
import { useNodeStore } from 'stores/node-store';

const emit = defineEmits<{
  'update:bot': [BotNode | undefined];
}>();

const $nodes = useNodeStore();
const selected = defineModel<string>('selected');
const treeRef = useTemplateRef<QTree>('my-tree');
const filter = ref<string>('');

watch(selected, (val) => {
  console.debug(`expand: ${val}`);
  treeRef.value?.setExpanded(val, true);
  emit('update:bot', treeRef.value?.getNodeByKey(val));
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
  <FilterInput v-model="filter" class="q-pt-xs q-px-md" />
  <q-separator inset />
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-scroll-area style="height: calc(100% - 56px)">
      <q-tree
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
    </q-scroll-area>
  </transition>
</template>
