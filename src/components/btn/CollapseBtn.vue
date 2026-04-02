<script setup lang="ts">
import { computed } from 'vue';
import { useTokenStore } from 'stores/token-store';

const $tokenStore = useTokenStore();

const props = defineProps<{
  side: 'left' | 'right';
}>();

const model = defineModel<boolean>();

const name = computed(() => {
  if (model.value) {
    if (props.side === 'left') {
      return `mdi-menu-open`;
    }
    return `mdi-menu-close`;
  }
  if (props.side === 'left') {
    return `mdi-menu-close`;
  }
  return `mdi-menu-open`;
});
</script>

<template>
  <q-btn v-if="$tokenStore.IsStu()" @click="model = !model" dense flat>
    <q-icon color="grey-8" :name="name" />
    <q-tooltip>{{ model ? 'Collapse' : 'Expand' }}</q-tooltip>
  </q-btn>
</template>
