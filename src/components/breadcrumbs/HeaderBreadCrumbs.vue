<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { BotColor, BotIcon, DateIcon, IdIcon } from 'src/types/base';



const router = useRouter();
const type = computed(() => {
  const b = router.currentRoute.value.name?.toString().match(/news|sitemap|search/gi) !== null;
  if (b) {
    return router.currentRoute.value.name as string;
  }
  return '';
});
const id = computed(() => {
  return router.currentRoute.value.params.id as string;
});
const date = computed(() => {
  return router.currentRoute.value.params.date as string;
});
const color = computed(() => {
  return BotColor(type.value);
});
const icon = computed(() => {
  return BotIcon(type.value);
});



</script>

<template>
  <div class="flex justify-center items-center">
    <div v-if="type !== ''" class="flex items-center">
      <q-icon :name="icon" :color="color" size="xs" />
      <div class="text-caption text-capitalize q-mx-sm">{{ type }}</div>
    </div>

    <div v-if="id !== '' && id !== undefined" class="flex items-center">
      <q-icon name="mdi-slash-forward" color="grey-9" size="sm" />
      <q-icon :name="IdIcon" :color="color" size="sm" />
      <div class="text-caption q-ml-xs">{{ id }}</div>
    </div>

    <div v-if="date !== ''&& date!==undefined" class="flex items-center">
      <q-icon name="mdi-slash-forward" color="grey-9" size="sm" class="q-mx-xs" />
      <q-icon :name="DateIcon" :color="color" size="xs" />
      <div class="text-caption q-ml-sm">{{ date }}</div>
    </div>
  </div>
</template>
