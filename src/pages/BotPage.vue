<script setup lang="ts">
import { computed } from 'vue';
import { useRouteHelper } from 'src/composable/routeHelper';
import type { BotEnum } from 'src/types/base';
import { Bot } from 'src/types/base';
import { NewJob } from 'src/types/job';
import BotForm from 'components/form/BotForm.vue';

const r = useRouteHelper();

const onSubmit = (tgt: string, lst: string[], frq: number): void => {
  const bot = Bot(r.botParam() as BotEnum);
  const job = NewJob(bot.jobType, tgt, lst, frq);
  console.debug('onSubmit', JSON.stringify(job, null, 2));
};

const color = computed(() => (r.jobParam() < 1 ? 'green-13' : 'amber-13'));
const isNotResultPage = computed(() => r.resultParam() < 1);
</script>

<template>
  <div v-if="isNotResultPage" class="absolute-center">
    <BotForm :bot="Bot(r.botParam() as BotEnum)" :color="color" @submit="onSubmit" />
  </div>
</template>
