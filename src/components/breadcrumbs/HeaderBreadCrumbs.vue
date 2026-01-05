<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { BotColor, BotIcon } from 'src/types/base';

const router = useRouter();
const parts = (): string[] =>
  router.currentRoute.value.path.replaceAll(/\/dashboard\//gi, '').split('/');
const type = computed(() => {
  const p = parts();
  return ((p.length > 0 && p[0]?.match(/news|sitemap|search/gi)?.length) ?? 0 > 0)
    ? (p[0] as string)
    : '';
});
const id = computed(() => {
  const p = parts();
  return p.length > 1 && type.value !== '' ? (p[1] as string) : '';
});
const date = computed(() => {
  const p = parts();
  return p.length > 2 && id.value !== '' ? (p[2] as string) : '';
});
const color = computed(() => {
  return BotColor(type.value);
});
const icon = computed(() => {
  return BotIcon(type.value);
});
</script>

<template>
  <div class="flex">
    <div v-if="type !== ''" class="flex items-center">
      <q-icon :name="icon" :color="color" size="xs" />
      <div class="text-caption text-capitalize q-mx-sm">{{ type }}</div>
    </div>

    <div v-if="id !== ''" class="flex items-center">
      <q-icon name="mdi-slash-forward" color="grey-14" size="xs" />
      <q-icon name="mdi-format-quote-open" :color="color" size="xs" />
      <div class="text-caption q-ml-xs">{{ id }}</div>
    </div>

    <div v-if="date !== ''" class="flex items-center">
      <q-icon name="mdi-slash-forward" color="grey-14" size="xs" />
      <q-icon name="mdi-table-clock" :color="color" size="xs" />
      <div class="text-caption q-mx-sm">{{ date }}</div>
    </div>
  </div>
</template>
