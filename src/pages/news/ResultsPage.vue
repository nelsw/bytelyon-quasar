<script setup lang="ts">
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import NewsTable from 'components/table/NewsTable.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBots } from 'stores/bots';
import type { Bot } from 'src/types/model';
import { BotType } from 'src/types/model';
import { useNewsBotResultsStore } from 'stores/news/result-store';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';

const $route = useRoute();
const $bots = useBots();
const $results = useNewsBotResultsStore();

const target = ref('');
const frequency = ref<number>(1);
const blackList = ref<string[]>([]);

const onDeleteBot = async () => await $bots.Delete(BotType.News, $route.params.botId as string);

const onModifyBot = async (n: number, l: string[]) =>
  await $bots.Save(BotType.News, $route.params.botId as string, target.value, n, l);

const onChangeBot = async () => {
  await $results.Load($route.params.botId as string);
  const bot = $bots.model
    .get(BotType.News, [])
    .find((b) => b.id === ($route.params.botId as string)) as Bot;

  target.value = bot.target;
  frequency.value = bot.frequency;
  blackList.value = bot.blackList ?? [];
};

watch(() => $route.params.botId, onChangeBot);
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
              <FrequencySelect
                color="amber-13"
                v-model="frequency"
                @update:model-value="onModifyBot(frequency, blackList)"
              />
              <BlackListSelect
                color="amber-13"
                v-model="blackList"
                @update:model-value="onModifyBot(frequency, blackList)"
              />
            </div>
            <div class="flex row q-gutter-x-sm">
              <TrashBtn @delete="onDeleteBot" size="md" >
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
        <NewsTable :bot-id="$route.params.botId as string" />
    </div>
  </div>
</template>
