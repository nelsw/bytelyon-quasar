<script setup lang="ts">
import TargetInput from 'components/input/TargetInput.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import { onMounted, ref } from 'vue';
import { BotType } from 'src/types/model';
import { useSearchBotStore } from 'stores/search/bot-store';

const color = 'green-13';

const $store = useSearchBotStore();

const target = ref<string>('');
const blackList = ref<string[]>([]);
const frequency = ref<number>(1);

const onSubmit = async () => {
  if (await $store.create(target.value, blackList.value, frequency.value)) {
    onReset();
  }
};

const onReset = () => {
  target.value = '';
  blackList.value = [];
  frequency.value = 1;
};

onMounted(onReset);
</script>

<template>
  <div class="absolute-center">
    <q-form id="my-form" @submit="onSubmit">
      <div class="flex justify-center align-center">
        <q-icon name="mdi-new-box" size="6em" :color="color" />
      </div>
      <div class="flex justify-center align-center">
        <div class="text-h4 text-center">Search Bot</div>
      </div>

      <TargetInput v-model="target" :color="color" :bot-type="BotType.Search" />

      <BlackListSelect
        v-model="blackList"
        class="q-mt-md"
        :color="color"
        :bot-type="BotType.Search"
      />

      <FrequencySelect
        v-model="frequency"
        class="q-my-md"
        :color="color"
        hint="Instruct the boat to run on a schedule or 'On-Demand' (once & pause)."
      />

      <SubmitBtn :color="color" label="Create" />
    </q-form>
  </div>
</template>
<style scoped lang="scss">
#my-form {
  width: 500px;
  margin-bottom: 48px;
}
</style>
