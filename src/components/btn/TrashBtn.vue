<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useBotStore } from 'stores/bot-store';

const router = useRouter();
const store = useBotStore();

const enable = computed(() => {
  const path = router.currentRoute.value.path;
  return path.substring(11, path.length).split('/').length === 3;
});

const onClick = () => {
  const path = router.currentRoute.value.path;
  const parts = path.substring(11, path.length).split('/');
  if (parts.length === 3) {
    const node = store.find(parts[0] as string, parts[1], parts[2]);
    console.log(`Delete Node: ${JSON.stringify(node, null, 2)}`);
  }
};
</script>

<template>
  <q-btn
    v-if="enable"
    color="negative"
    dense
    flat
    size="sm"
    icon="mdi-delete"
    @click="onClick"
  />
</template>
