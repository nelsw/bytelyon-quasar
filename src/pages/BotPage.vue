<script setup lang="ts">
import type { Bot } from 'src/types/model';
import { BotType } from 'src/types/model';
import TargetInput from 'components/input/TargetInput.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import { useBotStore } from 'stores/bot-store';
import { computed, onMounted, onUpdated, ref } from 'vue';

const props = defineProps<{
  bot: Bot;
}>();

const $bots = useBotStore();

const target = ref<string>('');
const blackList = ref<string[]>([]);
const frequency = ref<number>(1);

const color = computed(() => (props.bot.ID > 0 ? 'amber-13' : 'green-13'));
const isCreate = computed(() => props.bot.ID === 0);
const isUpdate = computed(() => props.bot.ID > 0);

const onSubmit = async () => {
  const b: Bot = props.bot;
  b.Target = target.value;
  if (b.Type === BotType.Sitemap && !b.Target.startsWith('https://')) {
    b.Target = `https://${b.Target}`;
  }
  b.BlackList = blackList.value;
  b.Frequency = frequency.value;
  await $bots.Save(b);
};

const onChange = () => {
  target.value = props.bot.ID > 0 ? props.bot.Target : '';
  blackList.value = props.bot.ID > 0 ? props.bot.BlackList : [];
  frequency.value = props.bot.ID > 0 ? props.bot.Frequency : 1;
};

onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <div class="absolute-center">
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
        <q-btn
          class="full-width q-mt-md"
          label="Delete"
          color="pink"
          size="md"
          outline
          @click="$bots.Delete(bot.ID)"
        />
      </div>
    </q-form>
  </div>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
