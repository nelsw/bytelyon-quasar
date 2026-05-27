<script setup lang="ts">
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import NewsTable from 'components/table/NewsTable.vue';
import { onMounted, ref, watch } from 'vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBotStore } from 'src/stores/bot-store';
import type { Bot, BotType, Post } from 'src/types/model';
import { BlogPost } from 'src/types/model';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import useNewsApi from 'src/composable/api/useNewsApi';
import { type Headline } from 'src/types/headline';
import { At } from 'src/types/base';
import { decodeTime } from 'ulid';

const color = 'amber-13';

const props = defineProps<{
  botType: BotType;
  target: string;
}>();

const $bots = useBotStore();
const $news = useNewsApi();

const dialog = ref(false);
const post = ref<Post>(new BlogPost());
const frequency = ref<number>(1);
const blackList = ref<string[]>([]);
const headless = ref<boolean>(true);
const rows = ref<Headline[]>([]);

const onDeleteBot = async () => await $bots.Delete(props.botType, props.target);
const onDeleteNews = async (url: string) => {
  const ok = await $news.deleteArticle(props.target, url);
  if (ok) {
    rows.value = rows.value.filter((item) => item.url !== url);
  }
};
const onUpdateBot = async () =>
  await $bots.Save(props.botType, props.target, frequency.value, blackList.value, headless.value);

const onPostArticle = async (url: string) => {
  const a = await $news.getArticle(props.target, url);
  post.value = {
    body: a.body.map((b) => `<p>${b}</p>`)?.join('') || '',
    image: a.image,
    keywords: a.keywords,
    publishedAt: At(decodeTime(a.id)),
    summary: a.description,
    tags: [],
    title: a.title,
    backlink: a.url,
  };
  dialog.value = true;
};

const onChangeBot = async () => {
  await $bots.Load(props.botType)
  const bot = $bots.model.get(props.botType, []).find((b) => b.target === props.target) as Bot;
  frequency.value = bot.frequency;
  blackList.value = bot.blackList ?? [];
  headless.value = bot.headless ?? true;

  rows.value = await $news.getHeadlines(props.target);
};

watch(props, onChangeBot);
onMounted(onChangeBot);
</script>

<template>
  <ShopifyDialog v-model:show="dialog" v-model:post="post" />
  <div class="q-pa-sm q-gutter-y-sm">
    <div>
      <q-card flat style="background-color: transparent">
        <q-card-section>
          <div class="flex justify-between items-center">
            <div class="flex items-center q-gutter-sm">
              <div class="text-h5 text-weight-medium text-uppercase">
                {{ target }}
              </div>
              <BrowserSelect v-model="headless" @update:model-value="onUpdateBot" :color="color" />
              <FrequencySelect
                v-model="frequency"
                @update:model-value="onUpdateBot"
                :color="color"
              />
              <BlackListSelect
                v-model="blackList"
                @update:model-value="onUpdateBot"
                :color="color"
              />
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
      <NewsTable v-model="rows" @shopify="onPostArticle" @delete="onDeleteNews" :target="target" />
    </div>
  </div>
</template>
