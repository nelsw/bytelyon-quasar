<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useBotStore } from 'stores/bot-store';
import { Loading } from 'quasar';
import { BotColor } from 'src/types/base';

const router = useRouter();
const store = useBotStore();

const enable = computed(() => {
  const path = router.currentRoute.value.path;
  const parts = path.substring(11, path.length).split('/');
  if (parts.length === 0 || parts[0] === 'news') {
    return false;
  }
  return parts.length === 3;
});

const onClick = async () => {
  const path = router.currentRoute.value.path;
  const parts = path.substring(11, path.length).split('/');
  if (parts.length === 3) {
    const node = store.find(parts[0] as string, parts[1], parts[2]);
    console.log(`Delete Node: ${JSON.stringify(node, null, 2)}`);
    if (!node) {
      return;
    }
    Loading.show({ spinnerColor: BotColor(parts[0]) });
    const ok = await store.Delete(node.data.id);
    console.log(`Deleted Node? [${ok}]: ${JSON.stringify(ok, null, 2)}`);
    Loading.hide();
  }
};
</script>

<template>
  <q-btn v-if="enable" color="red-13" dense flat size="sm" icon="mdi-delete" @click="onClick" />
</template>
