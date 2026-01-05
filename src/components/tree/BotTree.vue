<script setup lang="ts">
import type { QTree } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { BotColor } from 'src/types/base';
import { useBotStore } from 'stores/bot-store';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';
import { useFilterStore } from 'stores/filter-store';

const router = useRouter();
const store = useBotStore();
const tokenStore = useTokenStore();
const filterStore = useFilterStore();
const expanded = defineModel<string[]>('expanded', {
  default: [],
});
const loading = ref<boolean>(true);
const selected = defineModel<string>('selected');

const color = computed(() => {
  if (!selected.value) return;

  const idx = selected.value.indexOf('/');
  if (idx >= 0) {
    return BotColor(selected.value.substring(0, idx));
  }

  return BotColor(selected.value);
});

watch(selected, async () => {
  if (selected.value === 'logout') {
    await tokenStore.logout();
    return;
  }
  await router.push({ path: selected.value ? `/dashboard/${selected.value}` : '/dashboard' });
});

onMounted(async () => (loading.value = !(await store.loadAll())));
</script>

<template>
  <q-tree
    v-if="!loading"
    v-model:expanded="expanded"
    v-model:selected="selected"
    :filter="filterStore.model"
    :selected-color="color"
    :nodes="store.model"
    default-expand-all
    node-key="id"
    accordion
    no-selection-unset
  />
  <q-inner-loading :showing="loading" color="primary" />
</template>

<style scoped lang="scss"></style>
