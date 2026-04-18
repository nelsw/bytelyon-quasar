<script setup lang="ts">
import { type BotType } from 'src/types/model';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBotStore } from 'stores/bot-store';

const $route = useRoute();
const $store = useBotStore();

const botType = computed(() => $route.params.botType as BotType);
const botId = computed(() => $route.params.botId as string);
</script>

<template>
  <q-btn
    v-if="$store.target(botType, botId) !== ''"
    :to="`/dashboard/${botType}/${botId}`"
    color="amber-13"
    icon="mdi-pencil"
    size="md"
    dense
    flat
  >
    <q-tooltip anchor="top end" self="bottom right" :offset="[10, 10]"> Edit Bot </q-tooltip>
  </q-btn>
</template>
