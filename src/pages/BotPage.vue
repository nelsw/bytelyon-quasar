<script setup lang="ts">
import type { BotNode} from 'src/types/model';
import { BotType } from 'src/types/model';
import TargetInput from 'components/input/TargetInput.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import { useBotStore } from 'stores/bot-store';
import { computed, onMounted, onUpdated, ref } from 'vue';
import DeleteBtn from 'components/btn/DeleteBtn.vue';

const emit = defineEmits<{
  update: [string];
}>();

const props = defineProps<{
  bot: BotNode;
}>();

const $bots = useBotStore();

const target = ref<string>('');
const blackList = ref<string[]>([]);
const frequency = ref<number>(1);

const color = computed(() => (IsOldBot(props.bot) ? 'amber-13' : 'green-13'));

const IsOldBot = (bot: BotNode) => bot.botId !== '';

const onSubmit = () => {
  const b: BotNode = props.bot;
  b.target = target.value;
  b.blackList = blackList.value;
  b.frequency = frequency.value;
};

const onDelete = async () => {
  console.debug(`onDelete`, JSON.stringify(props.bot, null, 2));
  if (await $bots.Delete(props.bot)) {
    emit('update', props.bot.type)
  }
};

const onChange = () => {
  target.value = IsOldBot(props.bot) ? props.bot.target : '';
  blackList.value = IsOldBot(props.bot) ? props.bot.blackList : [];
  frequency.value = IsOldBot(props.bot) ? props.bot.frequency : 1;
};

onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <div class="absolute-center">
    <q-form id="my-form" @submit="onSubmit">
      <div class="flex justify-center align-center">
        <q-icon v-if="IsOldBot(bot)" name="mdi-pencil-box" size="6em" :color="color" />
        <q-icon v-else name="mdi-new-box" size="6em" :color="color" />
      </div>
      <div class="flex justify-center align-center">
        <div class="text-h4 text-center text-capitalize">{{ bot.type }} Bot</div>
      </div>

      <p v-if="bot.type === BotType.News" class="text-body1 text-center q-mt-sm">
        Aggregate news articles from popular & <br />reputable digital publishers & RSS feeds.
      </p>
      <p v-else-if="bot.type === BotType.Search" class="text-body1 text-center q-mt-sm"></p>
      <p v-else class="text-body1 text-center q-mt-sm"></p>

      <TargetInput v-model="target" :color="color" :bot-type="bot.type" :disable="IsOldBot(bot)" />

      <BlackListSelect
        v-if="bot.type !== BotType.Sitemap"
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

      <SubmitBtn :color="color" :label="IsOldBot(bot) ? 'Update' : 'Create'" />
      <DeleteBtn v-if="IsOldBot(bot)" @click="onDelete" />
    </q-form>
  </div>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
