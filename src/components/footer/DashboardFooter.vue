<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useBotStore } from 'stores/bot-store';
import { computed } from 'vue';
import { type BotType } from 'src/types/model';
import DashboardBreadcrumbs from 'components/breadcrumbs/DashboardBreadcrumbs.vue';

const $route = useRoute();
const $store = useBotStore();

const botType = computed(() => $route.params.botType as BotType);
const botId = computed(() => $route.params.botId as string);
const target = computed(() => {
  return $store.target(botType.value, botId.value);
});
</script>

<template>
  <q-footer v-if="botType" class="bg-dark" bordered>
    <div class="flex justify-between items-center q-my-sm q-mx-md">
      <DashboardBreadcrumbs :bot-type="botType" :bot-id="botId" :target="target" />
    </div>
  </q-footer>
</template>
