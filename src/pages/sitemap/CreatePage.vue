<script setup lang="ts">
import TargetInput from 'components/input/TargetInput.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import { onMounted, ref } from 'vue';
import { BotType } from 'src/types/model';
import { useSitemapBotStore } from 'stores/sitemap/bot-store';

const color = 'green-13';

const $store = useSitemapBotStore();

const target = ref<string>('');
const frequency = ref<number>(1);

const onSubmit = async () => {
  if (await $store.Create(target.value, frequency.value)) {
    onReset();
  }
};

const onReset = () => {
  target.value = '';
  frequency.value = 1;
};

onMounted(onReset);
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-center align-center">
      <q-icon name="mdi-new-box" size="6em" :color="color" />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center">Sitemap Bot</div>
    </div>
    <q-form @submit="onSubmit" style="min-width: 320px; max-width: 750px; margin: auto">
      <TargetInput v-model="target" :color="color" :bot-type="BotType.Sitemap" />

      <FrequencySelect
        v-model="frequency"
        class="q-my-md"
        :color="color"
        hint="Instruct the boat to run on a schedule or 'On-Demand' (once & pause)."
      />

      <SubmitBtn class="q-mt-md" :color="color" label="Create" />
    </q-form>
  </div>
</template>
