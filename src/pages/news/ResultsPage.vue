<script setup lang="ts">
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import NewsTable from 'components/table/NewsTable.vue';
import {  onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TrashBtn from 'components/btn/TrashBtn.vue';
import EditBotBtn from 'components/btn/EditBotBtn.vue';
import { useBots } from 'stores/bots';
import { BotType } from 'src/types/model';
import RefreshBtn from 'components/btn/RefreshBtn.vue';
import { useNewsBotResultsStore } from 'stores/news/result-store';

const $route = useRoute();
const $router = useRouter();
const $bots = useBots();
const $results = useNewsBotResultsStore();

const onDelete = async () => {
  const ok = await $bots.Delete(BotType.News, $route.params.botId as string);
  if (ok) {
    await $router.push(`/${BotType.News}`);
  }
};

onMounted(async () => {
  await $results.Load($route.params.botId as string);
});
watch(
  () => $route.params.botId,
  async (newVal) => {
    await $results.Load(newVal as string);
  },
);
</script>

<template>
  <ShopifyDialog />
  <div class="q-pa-sm q-gutter-y-sm">
    <q-card flat style="background-color: transparent">
      <q-card-section>
        <div class="flex justify-between items-center">
          <div class="flex q-gutter-sm">
            <div class="text-h5 text-weight-medium text-uppercase">
              {{
                $bots.model.get(BotType.News, []).find((t) => t.id === $route.params.botId)?.target
              }}
            </div>
          </div>
          <div>
            <RefreshBtn @click="$results.Load($route.params.botId as string, true)" />
            <EditBotBtn />
            <TrashBtn @delete="onDelete" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <NewsTable :bot-id="$route.params.botId as string" />
  </div>
</template>
