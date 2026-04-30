<script setup lang="ts">
import { computed, ref } from 'vue';
import { BotType } from 'src/types/model';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import TargetInput from 'components/input/TargetInput.vue';
import { useBots } from 'stores/bots';
import HeadToggle from 'components/toggle/HeadToggle.vue';

const props = defineProps<{
  botType: BotType,
}>();

const color = 'green-13';

const $bots = useBots();

const target = ref('');
const frequency = ref(1);
const blackList = ref<string[]>([]);
const headless = ref<boolean>(true);

const description = computed(() =>
  props.botType === BotType.News
    ? 'Aggregate news articles from popular & reputable digital publishers & RSS feeds.'
    : undefined
);

const onSubmit = async () => {

  await $bots.Save(
    props.botType,
    '',
    target.value,
    frequency.value,
    blackList.value
  );

};
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-center align-center">
      <q-icon :color="color" name="mdi-new-box" size="6em" />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center text-capitalize">
        {{ botType }}
      </div>
    </div>
    <p v-if="description" class="text-body1 text-center q-mt-sm">
      {{ description }}
    </p>
    <q-form @submit="onSubmit" class="my-form">
      <TargetInput v-model="target" :color="color" />

      <BlackListSelect v-model="blackList" :color="color" class="q-mt-md" hint icon label />

      <FrequencySelect v-model="frequency" :color="color" class="q-my-md" hint icon label />

      <HeadToggle v-model="headless" :color="color" class="q-my-md" size="lg" label />

      <SubmitBtn class="q-mt-md" :color="color" fullwidth />
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
