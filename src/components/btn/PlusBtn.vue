<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const enable = computed(() => {
  const path = router.currentRoute.value.path;
  return path.substring(11, path.length).split('/').length === 1;
});
</script>

<template>
  <div v-if="enable">
    <q-btn dense flat size="sm">
      <q-icon name="mdi-plus" color="green-13" />
    </q-btn>
  </div>
</template>
