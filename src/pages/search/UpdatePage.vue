<script setup lang="ts">
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import { onMounted, onUpdated, ref } from 'vue';
import type { Bot } from 'src/types/model';
import { BotType } from 'src/types/model';
import { useRouter } from 'vue-router';
import { useSearchBotStore } from 'stores/search/bot-store';
import TargetInput from 'components/input/TargetInput.vue';

const color = 'amber-13';

const $router = useRouter();
const $store = useSearchBotStore();

const bot = ref<Bot | null>(null);

const onSubmit = async () => {
  if (bot.value) {
    await $store.update(bot.value);
  }
};

const onChanged = async () => {
  const id = $router.currentRoute.value.params.id as string;
  const b: Bot | null = $store.find(id);
  if (b === null) {
    await $router.push({ path: '/error' });
    return;
  }
  bot.value = b;
};
onMounted(onChanged);
onUpdated(onChanged);
</script>

<template>
  <div v-if="bot" class="absolute-center">
    <q-form id="my-form" @submit="onSubmit">
      <div class="flex justify-center align-center">
        <q-icon name="mdi-pencil-box" size="6em" :color="color" />
      </div>
      <div class="flex justify-center align-center">
        <div class="text-h4 text-center">Search Bot</div>
      </div>

      <TargetInput v-model="bot.target" :color="color" :bot-type="BotType.Search" disable />

      <BlackListSelect
        v-model="bot.blackList"
        class="q-mt-md"
        :color="color"
        :bot-type="BotType.Search"
      />

      <FrequencySelect
        v-model="bot.frequency"
        class="q-my-md"
        :color="color"
        hint="Instruct the boat to run on a schedule or 'On-Demand' (once & pause)."
      />

      <SubmitBtn :color="color" label="Update" />
    </q-form>
  </div>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
