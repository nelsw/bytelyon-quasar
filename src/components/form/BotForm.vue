<script setup lang="ts">
import FrequencySelect from 'components/form/select/FrequencySelect.vue';
import TargetInput from 'components/form/input/TargetInput.vue';
import BlackListSelect from 'components/form/select/BlackListSelect.vue';
import SubmitBtn from 'components/form/btn/SubmitBtn.vue';
import { type Bot, BotEnum } from 'src/types/base';
import { onMounted, onUpdated, ref } from 'vue';
import { DefaultOption, FromValue, type Option } from 'src/types/dto';
import { type Job } from 'src/types/model';

const emit = defineEmits<{
  submit: [string, string[], number];
}>();

const props = defineProps<{
  bot: Bot;
  color: string;
  job?: Job | undefined;
}>();

const tgt = ref<string>('');
const lst = ref<string[]>([]);
const frq = ref<Option>(DefaultOption);

const onChange = () => {
  if (!props.job) return;
  tgt.value = props.job.Target;
  lst.value = props.job.BlackList;
  frq.value = FromValue(props.job.Frequency);
};

onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <q-form id="my-form" @submit="emit('submit', tgt, lst, frq.value)">
    <div class="flex justify-center align-center">
      <q-icon v-if="job" name="mdi-pencil-box" size="6em" :color="color" />
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

    <TargetInput v-model="tgt" :color="color" :bot-type="bot.type" :disable="job !== undefined" />

    <BlackListSelect
      v-if="bot.type !== BotEnum.Sitemaps"
      v-model="lst"
      class="q-mt-md"
      :color="color"
      :bot-type="bot.type"
    />

    <FrequencySelect
      v-model="frq"
      class="q-my-md"
      :color="color"
      hint="Instruct the boat to run on a schedule or 'On-Demand' (once & pause)."
    />

    <SubmitBtn :color="color" :label="`${color === 'green-13' ? 'create' : 'update'}`" />
    <div v-if="job !== undefined">
      <q-btn
        class="full-width q-mt-md"
        label="Delete"
        color="red-13"
        size="md"
        outline
      />
    </div>
  </q-form>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
