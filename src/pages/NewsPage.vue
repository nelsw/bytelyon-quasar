<script setup lang="ts">
import ShopifyDialog from 'components/dialog/ShopifyDialog.vue';
import NewsTable from 'components/table/NewsTable.vue';
import { onMounted, ref, watch } from 'vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBotStore } from 'src/stores/bots';
import type { Bot, BotType } from 'src/types/bot';
import { BlogPost, type Post } from 'src/types/model';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import { useNewsStore } from 'stores/news';
import { New } from 'src/types/bot';
import { useRouter } from 'vue-router';
import TargetInput from 'components/input/TargetInput.vue';

const props = defineProps<{
  botType: BotType;
  target: string;
}>();

const $bots = useBotStore();
const $news = useNewsStore();
const $router = useRouter();

const bot = ref<Bot>(New(props.botType, props.target));
const dialog = ref(false);
const post = ref<Post>(new BlogPost());

const onPostArticle = async (url: string) => {
  await $news.fetchArticle(props.target, url);
  post.value = $news.post;
  dialog.value = true;
};

const onChange = async () => {
  await $news.fetchHeadlines(props.target);
  bot.value = $bots.get(props.botType, props.target);
};

const onDelete = async () => {
  await $bots.delete(props.botType, props.target);
  await $router.replace({ path: `/${props.botType}` });
};
watch(props, onChange);
onMounted(onChange);
</script>

<template>
  <ShopifyDialog v-model:show="dialog" v-model:post="post" />
  <div class="q-pa-sm q-gutter-y-sm">
    <div>
      <q-card flat style="background-color: transparent">
        <q-card-section>
          <div class="flex justify-between items-center">
            <div class="flex items-center q-gutter-sm">
              <TargetInput v-model="bot.target" :hint="undefined" />
              <BrowserSelect
                v-model="bot.headless"
                @update:model-value="$bots.update(bot)"
              />
              <FrequencySelect v-model="bot.frequency" @update:model-value="$bots.update(bot)" />
              <BlackListSelect
                v-model="bot.blacklist"
                @update:model-value="$bots.update(bot)"
              />
            </div>
            <div class="flex row q-gutter-x-sm">
              <TrashBtn @delete="onDelete" size="md">
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
      <NewsTable
        v-model="$news.headlines"
        @shopify="onPostArticle"
        @delete="(url) => $news.deleteHeadline(target, url)"
        :target="target"
      />
    </div>
  </div>
</template>
