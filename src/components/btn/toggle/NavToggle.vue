<script setup lang="ts">
import { ref, watch } from 'vue';
import { Option } from 'src/types/base';
import { useRouter } from 'vue-router';

const router = useRouter();
const option = ref<string>('Profile');
const options = ref<Array<Option>>([
  new Option('Sitemaps'),
  new Option('News'),
  new Option('Profile'),
]);

watch(option, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await router.replace({ name: newValue });
  }
});
</script>

<template>
  <q-btn-toggle v-model="option" :options="options" class="q-mx-sm" toggle-color="primary" flat />
</template>
