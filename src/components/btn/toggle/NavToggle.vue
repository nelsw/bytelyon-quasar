<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Option } from 'src/types/base';
import { useRouter } from 'vue-router';

const router = useRouter();
const option = ref<string>('Profile');
const options = ref<Array<Option>>([
  new Option('Search'),
  new Option('Sitemaps'),
  new Option('News'),
  new Option('Profile'),
]);

watch(option, async (newValue, oldValue) => {
  console.debug(`Nav Toggle on=[${oldValue}] go=[${newValue}]`);
  if (newValue !== oldValue) {
    await router.push({ name: newValue });
  }
});
onMounted(() => option.value = router.currentRoute.value.name?.toString() ?? 'Profile');
</script>

<template>
  <q-btn-toggle v-model="option" :options="options" class="q-mx-sm" toggle-color="primary" flat />
</template>
