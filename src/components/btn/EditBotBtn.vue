<script setup lang="ts">
import { type BotType } from 'src/types/model';
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>

<template>
  <q-btn
    :to="`/${$route.params.botType as BotType}/${$route.params.botId as string}`"
    color="amber-13"
    icon="mdi-pencil"
    size="md"
    dense
    flat
  />
</template>
