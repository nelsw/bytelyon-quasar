<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { BotType } from 'src/types/model';
import { BotTypeDescription, BotTypeLabel } from 'src/types/model';
import { useRoute } from 'vue-router';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import SubmitBtn from 'components/btn/SubmitBtn.vue';
import TargetInput from 'components/input/TargetInput.vue';
import { useBots } from 'stores/bots';

const $route = useRoute();

const $bots = useBots();

const target = ref('');
const frequency = ref(1);
const blackList = ref<string[]>([]);

const color = computed(() => (!$route.params.botId ? 'green-13' : 'amber-13'));

const onSubmit = async () => {
  await $bots.Save(
    $route.params.botType as BotType,
    $route.params.botId as string,
    target.value,
    frequency.value,
    blackList.value,
  );
};

const onChange = (): void => {
  const bot = $bots.model
    .get($route.params.botType as BotType, [])
    .find((b) => b.id === ($route.params.botId as string));
  target.value = bot?.target as string;
  blackList.value = bot?.blackList as string[];
  frequency.value = bot?.frequency as number;
};

watch(() => $route.params.botType, onChange);
watch(() => $route.params.botId, onChange);
onMounted(onChange);
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-center align-center">
      <q-icon
        :color="color"
        :name="color === 'green-13' ? 'mdi-new-box' : 'mdi-pencil-box'"
        size="6em"
      />
    </div>
    <div class="flex justify-center align-center">
      <div class="text-h4 text-center">
        {{ BotTypeLabel($route.params.botType as BotType) }} Bot
      </div>
    </div>
    <p class="text-body1 text-center q-mt-sm">
      {{ BotTypeDescription($route.params.botType as BotType) }}
    </p>
    <q-form @submit="onSubmit" class="my-form">
      <TargetInput v-model="target" :color="color" />

      <BlackListSelect v-model="blackList" :color="color" class="q-mt-md" />

      <FrequencySelect v-model="frequency" :color="color" class="q-my-md" />

      <SubmitBtn class="q-mt-md" :color="color" />
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
