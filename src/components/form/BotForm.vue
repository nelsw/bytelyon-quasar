<script setup lang="ts">
import FrequencySelect from 'components/form/select/FrequencySelect.vue';
import TargetInput from 'components/form/input/TargetInput.vue';
import BlackListSelect from 'components/form/select/BlackListSelect.vue';
import SubmitBtn from 'components/form/btn/SubmitBtn.vue';
import { type Bot, BotEnum } from 'src/types/base';
import { computed, onMounted, ref } from 'vue';
import { type Job, NewJob } from 'src/types/model';
import { useBotStore } from 'stores/v2/bot-store';

const props = defineProps<{
  bot: Bot;
  job?: Job | undefined;
}>();

const $store = useBotStore();

const target = ref<string>('');
const blackList = ref<string[]>([]);
const frequency = ref<number>(1);

const isUpdate = computed(() => props.job !== undefined);
const color = computed(() => (props.job !== undefined ? 'amber-13' : 'green-13'));

const onSubmit = async () => {
  if (props.job === undefined) {
    const jt = props.bot.jobType;
    const nj = NewJob(jt, target.value, blackList.value, frequency.value);
    await $store.save(nj);
    return;
  }
  const j: Job = props.job;
  j.Target = target.value;
  j.BlackList = blackList.value;
  j.Frequency = frequency.value;
  await $store.save(j);
};

onMounted(() => {
  target.value = props.job?.Target || '';
  blackList.value = props.job?.BlackList || [];
  frequency.value = props.job?.Frequency || 1;
});
</script>

<template>
  <q-form id="my-form" @submit="onSubmit">
    <div class="flex justify-center align-center">
      <q-icon v-if="isUpdate" name="mdi-pencil-box" size="6em" :color="color" />
      <q-icon v-else name="mdi-new-box" size="6em" :color="color" />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center text-capitalize">{{ bot.label }} Bot</div>
    </div>

    <p v-if="bot.type === BotEnum.Articles" class="text-body1 text-center q-mt-sm">
      Aggregate news articles from popular & <br />reputable digital publishers & RSS feeds.
    </p>
    <p v-else-if="bot.type === BotEnum.Searches" class="text-body1 text-center q-mt-sm">
      Sitemap desc
    </p>
    <p v-else class="text-body1 text-center q-mt-sm">Search desc</p>

    <TargetInput v-model="target" :color="color" :bot-type="bot.type" :disable="isUpdate" />

    <BlackListSelect
      v-if="bot.type !== BotEnum.Sitemaps"
      v-model="blackList"
      class="q-mt-md"
      :color="color"
      :bot-type="bot.type"
    />

    <FrequencySelect
      v-model="frequency"
      class="q-my-md"
      :color="color"
      hint="Instruct the boat to run on a schedule or 'On-Demand' (once & pause)."
    />

    <div v-if="isUpdate">
      <SubmitBtn :color="color" label="create" />
      <q-btn class="full-width q-mt-md" label="Delete" color="red-13" size="md" outline />
    </div>
    <div v-else>
      <SubmitBtn :color="color" label="update" />
    </div>
  </q-form>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
