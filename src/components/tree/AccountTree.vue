<script setup lang="ts">
import type { QTree, QTreeNode } from 'quasar';
import { onMounted, ref } from 'vue';
const nodes = ref<QTreeNode[]>([]);
const selected = defineModel<string>('selected', {});
onMounted(() => {
  nodes.value = [
    {
      id: 'account',
      label: 'Account',
      icon: 'mdi-account-circle',

      expandable: true,
      selectable: true,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'mdi-logout',
      selectable: true,
    },
  ];
});
</script>

<template>
  <q-tree
    v-model:selected="selected"
    :nodes="nodes"
    node-key="id"
    accordion
  />
</template>

<style scoped lang="scss"></style>
