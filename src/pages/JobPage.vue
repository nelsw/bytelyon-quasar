<script setup lang="ts">
import { useRouteHelper } from 'src/composable/routeHelper';
import { NewJob } from 'src/types/model';
import BotForm from 'components/form/BotForm.vue';

const r = useRouteHelper();

const onSubmit = (tgt: string, lst: string[], frq: number): void => {
  const job = NewJob(r.bot().jobType, tgt, lst, frq);
  console.debug('onSubmit', JSON.stringify(job, null, 2));
};
</script>

<template>
  <div v-if="r.resultParam() < 1" class="absolute-center">
    <BotForm
      :bot="r.bot()"
      @submit="onSubmit"
      :color="`${r.jobParam() < 1 ? 'green-13' : 'amber-13'}`"
    />
  </div>
</template>
