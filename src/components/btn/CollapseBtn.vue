<script setup lang="ts">
import { computed } from 'vue';

// menu-open points to the left
const iconDirLeft = 'mdi-menu-open';
// menu-close points to the right
const iconDirRight = 'mdi-menu-close';

const props = defineProps<{
  collapse: 'left' | 'right';
  inverse?: boolean;
}>();

const model = defineModel<boolean>();

const name = computed(() => {
  let name = '';

  // if expanded, show collapse
  if (model.value) {
    // show collapse is to the left
    if (props.collapse === 'left') {
      name = iconDirLeft;
    }
    name = iconDirRight;
  } else {
    // if collapsed, show expand
    if (props.collapse === 'right') {
      name = iconDirLeft;
    } else {
      name = iconDirRight;
    }
  }

  if (!props.inverse) {
    return name;
  }
  if (name === iconDirLeft) {
    return iconDirRight;
  }
  return iconDirLeft;
});
const tooltip = computed(() => {
  let tooltip = '';
  if (model.value) {
    tooltip = 'Collapse'
  } else {
    tooltip = 'Expand';
  }
  if (props.inverse) {
    tooltip = tooltip === 'Collapse' ? 'Expand' : 'Collapse';
  }
  return tooltip;
})
</script>

<template>
  <q-btn @click="model = !model" dense flat size="sm" style="padding:0;">
    <q-icon color="grey-8" :name="name" size="sm" />
    <q-tooltip>{{ tooltip }}</q-tooltip>
  </q-btn>
</template>
