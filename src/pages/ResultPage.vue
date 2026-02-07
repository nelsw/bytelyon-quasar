<script setup lang="ts">
import { reactive } from 'vue';
import { useRouteHelper } from 'src/composable/routeHelper';
import type { BotEnum } from 'src/types/base';
import { Bot } from 'src/types/base';
import { NewJob } from 'src/types/job';
import BotForm from 'components/form/BotForm.vue';

const r = useRouteHelper();
const bot = reactive<Bot>(Bot(r.botParam() as BotEnum));

const onSubmit = (tgt: string, lst: string[], frq: number): void => {
  const job = NewJob(bot.jobType, tgt, lst, frq);
  console.debug('onSubmit', JSON.stringify(job, null, 2));
};
</script>

<template>
  <div v-if="r.resultParam() < 1" class="absolute-center">
    <BotForm
      :bot="bot"
      @submit="onSubmit"
      :color="`${r.jobParam() < 1 ? 'green-13' : 'amber-13'}`"
    />
  </div>
</template>
