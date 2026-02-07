<script setup lang="ts">
import FrequencySelect from 'components/form/select/FrequencySelect.vue';
import TargetInput from 'components/form/input/TargetInput.vue';
import BlackListSelect from 'components/form/select/BlackListSelect.vue';
import SubmitBtn from 'components/form/btn/SubmitBtn.vue';
import { type Bot, BotEnum } from 'src/types/base';
import { ref } from 'vue';
import { DefaultOption, type Option } from 'src/types/dto';

const emit = defineEmits<{
  submit: [string, string[], number];
}>();

defineProps<{
  bot: Bot;
  color: string;
}>();

const tgt = ref<string>('');
const lst = ref<string[]>([]);
const frq = ref<Option>(DefaultOption);
</script>

<template>
  <q-form id="my-form" @submit="emit('submit', tgt, lst, frq.value)">
    <div v-if="color === 'green-13'" class="flex justify-center align-center">
      <q-icon name="mdi-new-box" size="6em" color="green-13" />
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
    <TargetInput v-model="tgt" :color="color" :bot-type="bot.type" autofocus />

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
      hint="Configure how often this bot should go to work."
    />

    <SubmitBtn :color="color" :label="`${color === 'green-13' ? 'create' : 'update'}`" />
  </q-form>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
