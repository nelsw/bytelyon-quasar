<script setup lang="ts">
import FrequencySelect from 'components/form/select/FrequencySelect.vue';
import TargetInput from 'components/form/input/TargetInput.vue';
import BlackListSelect from 'components/form/select/BlackListSelect.vue';
import type { Bot } from 'src/types/base';
import { Sitemaps } from 'src/types/base';
import { ref } from 'vue';
import type { Option } from 'src/types/frequency';
import { Options } from 'src/types/frequency';

const color = 'green-13';

const emit = defineEmits<{
  submit: [string, string[], number];
}>();

defineProps<{
  bot: Bot;
}>();

const tgt = ref<string>('');
const lst = ref<string[]>([]);
const frq = ref<Option>(Options[2] as Option);
</script>

<template>
  <q-form id="my-form" @submit="emit('submit', tgt, lst, frq.value)">
    <div class="flex justify-center align-center">
      <q-icon name="mdi-new-box" size="6em" color="green-13" />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center text-capitalize">{{ bot.type }} Bot</div>
    </div>

    <p class="text-body1 text-center q-mt-sm">
      Aggregate news articles from popular & <br />reputable digital publishers & RSS feeds.
    </p>

    <TargetInput v-model="tgt" :color="color" :bot="bot" autofocus />

    <BlackListSelect
      v-if="bot.type !== Sitemaps.type"
      v-model="lst"
      class="q-mt-md"
      :color="color"
      :bot="bot"
    />

    <FrequencySelect
      v-model="frq"
      class="q-my-md"
      :color="color"
      hint="Configure how often this bot should go to work."
    />

    <!--    <SubmitBtn />-->
  </q-form>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
