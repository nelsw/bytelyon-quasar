<script setup lang="ts">
import { useRouteHelper } from 'src/composable/routeHelper';
import type { Job} from 'src/types/model';
import { NewJob } from 'src/types/model';
import BotForm from 'components/form/BotForm.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useBotStore } from 'stores/v2/bot-store';

const color = 'amber-13';
const r = useRouteHelper();
const store = useBotStore();
const job = ref<Job | null>();

const onSubmit = (tgt: string, lst: string[], frq: number): void => {
  const job = NewJob(r.bot().jobType, tgt, lst, frq);
  console.debug('onSubmit', JSON.stringify(job, null, 2));
};

const onChange = () => {
  const id: number = r.jobParam();
  if (id > 0) {
    job.value = store.find(id, r.bot().jobType);
  } else {
    job.value = null;
  }
};

onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <div v-if="job !== null" class="absolute-center">
    <BotForm @submit="onSubmit" :bot="r.bot()" :job="job" :color="color" />
  </div>
</template>
