<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useBotStore } from 'stores/bot-store';
import { computed } from 'vue';

const router = useRouter();
const store = useBotStore();

const enable = computed(() => {
  const path = router.currentRoute.value.path;
  return path.substring(11, path.length).split('/').length === 2;
});

const onClick = () => {
  const path = router.currentRoute.value.path;
  const parts = path.substring(11, path.length).split('/');
  if (parts.length === 2) {
    const node = store.find(parts[0] as string, parts[1], parts[2]);
    console.log(`Create Node: ${JSON.stringify(node, null, 2)}`);
  }
};
</script>

<template>
  <q-separator v-if="enable" vertical style="margin-left: 8px;margin-right:5px;"/>
  <div v-if="enable">
    <q-btn dense flat size="sm" @click="onClick">
      <q-icon name="mdi-pencil" color="orange-13" />
    </q-btn>
  </div>
</template>
