<script setup lang="ts">
import { ref } from 'vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import TargetInput from 'components/input/TargetInput.vue';
import { useBotStore } from 'src/stores/bots';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import { type Bot, type BotType, New } from 'src/types/bot';
import { useRouter } from 'vue-router';

const props = defineProps<{
  botType: BotType;
}>();

const $bots = useBotStore();
const $router = useRouter();

const bot = ref<Bot>(New(props.botType));
const onCreate = async () => {
  if (!(await $bots.create(bot.value))) return;
  await $router.push({ path: `/${props.botType}/${bot.value.target}` });
};
</script>
<template>
  <div class="q-pa-md">
    <div class="flex justify-center align-center">
      <q-icon color="green-13" name="mdi-new-box" size="6em" />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center text-capitalize">
        {{ botType }}
      </div>
    </div>
    <p v-if="botType === 'news'" class="text-body1 text-center q-mt-sm">
      Aggregate news articles from popular & reputable digital publishers & RSS feeds.
    </p>
    <q-form @submit="onCreate" class="my-form">
      <TargetInput v-model="bot.target" create/>
      <BrowserSelect v-model="bot.headless" class="q-my-md" create hint label />
      <FrequencySelect v-model="bot.frequency" class="q-my-md" create hint label />
      <BlackListSelect v-model="bot.blacklist" class="q-mt-md" create hint label />
      <SubmitBtn class="q-mt-md" color="green-13" fullwidth />
    </q-form>
  </div>
</template>
<style lang="scss" scoped>
.my-form {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  padding: 16px;
}
</style>
