<script setup lang="ts">
import { onMounted, onUpdated, ref, useTemplateRef, watch } from 'vue';
import { QTree, useMeta } from 'quasar';
import FilterInput from 'components/input/FilterInput.vue';
import ScrollArea from 'components/scroll-area/ScrollArea.vue';
import PageCard from 'components/card/PageCard.vue';
import { useBotStore } from 'src/stores/bots';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import TrashBtn from 'components/btn/TrashBtn.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import type { UrlNode } from 'src/types/url-node';
import { FromURLs } from 'src/types/url-node';
import useSitemapsApi from 'src/composable/api/useSitemapsApi';
import { type Snippet } from 'src/types/snippet';
import { useRouter } from 'vue-router';
import { type Bot, type BotType, New } from 'src/types/bot';
import TargetInput from 'components/input/TargetInput.vue';

const props = defineProps<{
  botType: BotType;
  target: string;
}>();

const $sitemaps = useSitemapsApi();
const $bots = useBotStore();
const $router = useRouter();

const bot = ref<Bot>(New(props.botType, props.target));
const sitemap = ref<string[]>([]);
const snippets = ref<Snippet[]>([]);

const nodes = ref<UrlNode[]>([]);
const treeRef = useTemplateRef<QTree>('my-sitemap-tree');
const splitterModel = ref(50);
const selected = ref<string>('');
const expanded = ref<string[]>([]);
const filter = ref<string>('');

const onDelete = async () => {
  await $bots.delete(props.botType, props.target);
  await $router.replace({ path: `/${props.botType}` });
};

const onChange = async () => {
  bot.value = $bots.get(props.botType, props.target);

  const urls = await $sitemaps.getUrls(props.target);
  sitemap.value = urls;
  nodes.value = FromURLs(urls);

  const node = nodes.value[0];
  if (!node) return;

  selected.value = node.label;
  expanded.value = [selected.value];

  if (node.url) {
    snippets.value = await $sitemaps.getSnippets(props.target, node.url);
  }
};

watch(selected, async (newVal, oldVal) => {
  const tree = treeRef.value;
  if (!tree) return;

  const node = tree.getNodeByKey(newVal) as UrlNode;
  if (node) {
    tree.setExpanded(newVal, true);
    if (node.url) {
      snippets.value = await $sitemaps.getSnippets(props.target, node.url);
    }
  } else if (tree.getNodeByKey(oldVal)) {
    tree.setExpanded(oldVal, false);
  }
});
watch(props, onChange);
onMounted(onChange);
onUpdated(onChange);
useMeta(() => ({ title: `Sitemap | ${props.target}` }));
</script>

<template>
  <div class="q-pa-sm q-gutter-y-sm">
    <q-card flat style="background-color: transparent">
      <q-card-section>
        <div class="flex row items-center q-gutter-sm">
          <TargetInput class="col-3" v-model="bot.target" :hint="undefined" />
          <BrowserSelect v-model="bot.headless" @update:model-value="$bots.update(bot)" />
          <FrequencySelect v-model="bot.frequency" @update:model-value="$bots.update(bot)" />
          <q-space />
          <TrashBtn @delete="onDelete" size="md">
            <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
              Delete Bot
            </q-tooltip>
          </TrashBtn>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <q-separator />
  <q-splitter v-model="splitterModel" :limits="[15, 85]" class="full-height">
    <template #before>
      <FilterInput v-model="filter" class="q-pt-sm q-px-md" />
      <q-separator inset />
      <ScrollArea style="height: calc(100vh - 48px - 38px - 88px); max-width: 100vw">
        <q-tree
          class="q-px-md q-py-sm"
          ref="my-sitemap-tree"
          v-model:selected="selected"
          v-model:expanded="expanded"
          node-key="label"
          :filter="filter"
          :nodes="nodes"
          accordion
          dense
          default-expand-all
          selected-color="primary"
        />
      </ScrollArea>
    </template>
    <template #after>
      <div v-if="snippets">
        <div v-for="s in snippets" :key="s.id" class="">
          <PageCard :id="s.id" :url="s.url" :title="s.title" :meta="s.meta" class="q-ma-xs" />
        </div>
      </div>
    </template>
  </q-splitter>
</template>
