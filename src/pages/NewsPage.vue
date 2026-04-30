<script setup lang="ts">
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import NewsTable from 'components/table/NewsTable.vue';
import { onMounted, ref, watch } from 'vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBots } from 'stores/bots';
import type { Bot, BotType } from 'src/types/model';
import { useNewsBotResultsStore } from 'stores/news/result-store';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BrowserSelect from 'components/select/BrowserSelect.vue';

const color = 'amber-13'

const props = defineProps<{
  botType: BotType,
  botId: string;
}>()

const $bots = useBots();
const $results = useNewsBotResultsStore();

const target = ref('');
const frequency = ref<number>(1);
const blackList = ref<string[]>([]);
const headless = ref<boolean>(true);

const onDeleteBot = async () => await $bots.Delete(props.botType, props.botId);

const onUpdate = async () =>
  await $bots.Save(
    props.botType,
    props.botId,
    target.value,
    frequency.value,
    blackList.value,
    headless.value,
  );

const onChangeBot = async () => {
  await $results.Load(props.botId);
  const bot = $bots.model
    .get(props.botType, [])
    .find((b) => b.id === (props.botId)) as Bot;

  target.value = bot.target;
  frequency.value = bot.frequency;
  blackList.value = bot.blackList ?? [];
  headless.value = bot.headless ?? true;
};

watch(props, onChangeBot);
onMounted(onChangeBot);
</script>

<template>
  <ShopifyDialog />
  <div class="q-pa-sm q-gutter-y-sm">
    <div>
      <q-card flat style="background-color: transparent">
        <q-card-section>
          <div class="flex justify-between items-center">
            <div class="flex items-center q-gutter-sm">
              <div class="text-h5 text-weight-medium text-uppercase">
                {{ target }}
              </div>
              <BrowserSelect v-model="headless" @update:model-value="onUpdate" :color="color" />
              <FrequencySelect v-model="frequency" @update:model-value="onUpdate" :color="color" />
              <BlackListSelect v-model="blackList" @update:model-value="onUpdate" :color="color" />
            </div>
            <div class="flex row q-gutter-x-sm">
              <TrashBtn @delete="onDeleteBot" size="md">
                <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
                  Delete Bot
                </q-tooltip>
              </TrashBtn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-mx-md">
      <NewsTable :bot-id="botId" />
    </div>
  </div>
</template>
