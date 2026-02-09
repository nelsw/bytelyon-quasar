<script setup lang="ts">
import FrequencySelect from 'components/form/select/FrequencySelect.vue';
import TargetInput from 'components/form/input/TargetInput.vue';
import BlackListSelect from 'components/form/select/BlackListSelect.vue';
import SubmitBtn from 'components/form/btn/SubmitBtn.vue';
import { computed, onMounted, onUpdated, ref } from 'vue';
import { type Bot, BotType } from 'src/types/model';
import { useBotStore } from 'stores/v2/bot-store';

const props = defineProps<{
  bot: Bot;
}>();

const $bots = useBotStore();

const target = ref<string>('');
const blackList = ref<string[]>([]);
const frequency = ref<number>(1);

const color = computed(() => (props.bot.CreatedAt > 0 ? 'amber-13' : 'green-13'));
const isCreate = computed(() => props.bot.CreatedAt === 0);
const isUpdate = computed(() => props.bot.CreatedAt > 0);

const onSubmit = async () => {
  const b: Bot = props.bot;
  b.Target = target.value;
  b.BlackList = blackList.value;
  b.Frequency = frequency.value;
  await $bots.Save(b);
};

const onChange = () => {
  target.value = props.bot.Target;
  blackList.value = props.bot.BlackList;
  frequency.value = props.bot.Frequency;
};

onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <q-form id="my-form" @submit="onSubmit">
    <div class="flex justify-center align-center">
      <q-icon v-if="isCreate" name="mdi-new-box" size="6em" :color="color" />
      <q-icon v-else name="mdi-pencil-box" size="6em" :color="color" />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center text-capitalize">{{ bot.Type }} Bot</div>
    </div>

    <p v-if="bot.Type === BotType.News" class="text-body1 text-center q-mt-sm">
      Aggregate news articles from popular & <br />reputable digital publishers & RSS feeds.
    </p>
    <p v-else-if="bot.Type === BotType.Search" class="text-body1 text-center q-mt-sm">
      Sitemap desc
    </p>
    <p v-else class="text-body1 text-center q-mt-sm">Search desc</p>

    <TargetInput v-model="target" :color="color" :bot-type="bot.Type" :disable="isUpdate" />

    <BlackListSelect
      v-if="bot.Type !== BotType.Sitemap"
      v-model="blackList"
      class="q-mt-md"
      :color="color"
      :bot-type="bot.Type"
    />

    <FrequencySelect
      v-model="frequency"
      class="q-my-md"
      :color="color"
      hint="Instruct the boat to run on a schedule or 'On-Demand' (once & pause)."
    />

    <div v-if="isCreate">
      <SubmitBtn :color="color" label="create" />
    </div>
    <div v-else>
      <SubmitBtn :color="color" label="update" />
<!--      todo - remove from model-->
      <q-btn class="full-width q-mt-md" label="Delete" color="pink" size="md" outline @click="$bots.Delete(bot.ID)"/>
    </div>
  </q-form>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
