<script setup lang="ts">
import type { QTree } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import { BotColor } from 'src/types/base';
import { useBotStore } from 'stores/bot-store';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';

const router = useRouter();
const store = useBotStore();
const tokenStore = useTokenStore();
const selected = defineModel<string>('selected', {});
const expanded = defineModel<string[]>('expanded', {});
const loading = ref<boolean>(true);

const color = computed(() => {
  let key = selected.value ?? '';
  if (key.includes('/')) {
    key = key.substring(0, key.indexOf('/'));
  }
  return BotColor(key);
});

watch(selected, async () => {
  console.debug(`BotTree Selection [${selected.value}]`);
  if (selected.value === 'logout') {
    await tokenStore.logout();
    return;
  }
  const path = selected.value ? `/dashboard/${selected.value}` : '/dashboard';

  await router.push({ path:path });
});

onMounted(async () => {
  await store.loadAll();
  loading.value = false;
});
</script>

<template>
  <q-tree
    v-model:expanded="expanded"
    v-model:selected="selected"
    :selected-color="color"
    :nodes="store.model"
    node-key="id"
    accordion
  />
  <q-inner-loading :showing="loading" color="primary" />
</template>

<style scoped lang="scss"></style>
