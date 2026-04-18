<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { type Bot, BotType, BotTypeDescription, BotTypeLabel, NewBot } from 'src/types/model';
import { useBotStore } from 'stores/bot-store';
import { useRoute, useRouter } from 'vue-router';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import TargetInput from 'components/input/TargetInput.vue';

const $route = useRoute();
const $router = useRouter();
const $store = useBotStore();

const bot = reactive(NewBot(BotType.News));

const onSubmit = async () => {
  const tmp = await $store.save(bot);
  if (tmp) {
    bot.id = (tmp as Bot).id;
  }
};

const onDelete = async () => {
  if (await $store.remove(bot)) await $router.push(`/dashboard/${bot.type}`);
};

const onChange = (): void => {
  bot.type = ($route.params.botType as BotType) ?? BotType.News;
  bot.id = ($route.params.botId as string) ?? '';
  bot.target = $store.target(bot.type, bot.id);
  bot.blackList = $store.blackList(bot.type, bot.id);
  bot.frequency = $store.frequency(bot.type, bot.id);
};

watch(() => $route.params.botType, onChange);
watch(() => $route.params.botId, onChange);
onMounted(onChange);
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-center align-center">
      <q-icon
        :color="bot.id === '' ? 'green-13' : 'amber-13'"
        :name="bot.id === '' ? 'mdi-new-box' : 'mdi-pencil-box'"
        size="6em"
      />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center">{{ BotTypeLabel(bot.type) }} Bot</div>
    </div>
    <p class="text-body1 text-center q-mt-sm">
      {{ BotTypeDescription(bot.type) }}
    </p>
    <q-form @submit="onSubmit" class="my-form">
      <TargetInput v-model="bot" />

      <BlackListSelect v-model="bot" class="q-mt-md" />

      <FrequencySelect v-model="bot" class="q-my-md" />

      <SubmitBtn class="q-mt-md" :bot="bot" />
      <q-btn
        v-if="bot.id !== ''"
        @click="onDelete"
        class="full-width q-mt-md"
        label="Delete"
        color="pink-13"
        size="lg"
        outline
      />
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
