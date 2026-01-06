<script setup lang="ts">
import { QTree } from 'quasar';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { SearchColor } from 'src/types/base';
import { useBotStore } from 'stores/bot-store';
import { useRouter } from 'vue-router';
import { useTokenStore } from 'stores/token-store';
// const model = defineModel<string>();
defineProps<{
  filter?: string;
}>();
const tree = useTemplateRef<QTree>('my-tree');
const router = useRouter();
const store = useBotStore();
const tokenStore = useTokenStore();
// const expanded = defineModel<string[]>('expanded', {
//   default: [],
// });
const loading = ref<boolean>(true);
const selected = defineModel<string>('selected');
// const color = computed(() => {
//   if (!selected.value) return;
//
//   const idx = selected.value.indexOf('/');
//   if (idx >= 0) {
//     return BotColor(selected.value.substring(0, idx));
//   }
//
//   return BotColor(selected.value);
// });

const onSelected = async (s: string | undefined) => {
  if (s === null) return;
  if (selected.value === 'logout') {
    await tokenStore.logout();
    return;
  }

  const expanded = tree.value?.isExpanded(s);
  console.log(s, selected.value, expanded);
  tree.value?.setExpanded(s, !expanded);
  await router.push({ path: s ? `/dashboard/${s}` : '/dashboard' });
};


watch(selected, console.debug)

onMounted(async () => (loading.value = !(await store.loadAll())));
</script>

<template>
  <q-tree
    ref="my-tree"
    v-if="!loading"
    v-model:selected="selected"
    :nodes="store.model"
    :filter="filter"
    node-key="id"
    accordion
    @update:selected="onSelected"
  />
  <q-inner-loading :showing="loading" :color="SearchColor" />
</template>

<style scoped lang="scss"></style>
