<script setup lang="ts">
import type { QTreeNode } from 'quasar';
import { QTree } from 'quasar';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useBotStore } from 'stores/bot-store';
import { BotColor } from 'src/types/base';
import { useRouter } from 'vue-router';

const model = defineModel<string>();

const router = useRouter();
const store = useBotStore();
const tree = useTemplateRef<QTree>('my-tree');

const selected = ref<string | null>(null);

const nodeColor = (n: QTreeNode) => BotColor(n.id);
const nodeIcon = (n: QTreeNode) => {
  switch (n.id?.split('/')?.length) {
    case 3:
      return 'mdi-table-clock';
    case 2:
      return 'mdi-format-quote-open';
    default:
      return n.icon;
  }
};

watch(selected, async (newVal, oldVal) => {
  console.debug(`BotTree Selection: \n\tnew=[${newVal}]\n\told=[${oldVal}]`);
  let s;
  if (newVal === null) {
    tree.value?.setExpanded(oldVal, !tree.value?.isExpanded(oldVal));
    s = oldVal;
  } else {
    s = newVal;
    tree.value?.setExpanded(newVal, !tree.value?.isExpanded(newVal));
  }

  const [type, id, date] = (s ?? '').split('/');
  await router.push({ name: `${type}`, params: { id, date } });
});

watch(model, (newVal, oldVal) => {
  console.debug(`BotTree Filter: \n\tnew=[${newVal}]\n\told=[${oldVal}]`);
  if (oldVal === '' && newVal !== '') {
    tree.value?.expandAll();
  } else if (oldVal !== '' && newVal === '') {
    tree.value?.collapseAll();
  }
});
onMounted(async () => {
  await store.loadAll();
});
</script>

<template>
  <q-tree
    ref="my-tree"
    v-model:selected="selected"
    :nodes="store.model"
    :filter="model"
    node-key="id"
    accordion
    dark
  >
    <template v-slot:default-header="prop">
      <div class="row items-center">
        <q-icon :name="nodeIcon(prop.node)" :color="nodeColor(prop.node)" class="q-mr-sm" />
        <div>{{ prop.node.label }}</div>
      </div>
    </template>
  </q-tree>
</template>
