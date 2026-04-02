<script setup lang="ts">
import type { BotNewsResult, BotNode } from 'src/types/model';
import { BotType } from 'src/types/model';
import NewsTable from 'components/table/NewsTable.vue';
import ArticleDialog from 'components/dialog/ArticleDialog.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useDataStore } from 'stores/data-store';
import { useNodeStore } from 'stores/node-store';

const emit = defineEmits<{
  update: [BotType];
}>();

const $resultStore = useDataStore();
const $nodeStore = useNodeStore();

const model = defineModel<BotNode>({ required: true });

const rows = ref<BotNewsResult[]>([]);
const selected = ref<BotNewsResult[]>([]);
const result = ref<BotNewsResult | undefined>(undefined);
const dialog = ref<boolean>(false);

const onPost = (id: string) => {
  result.value = rows.value.find((v) => v.id === id);
  dialog.value = true;
};
const onDelete = async () => {
  const ok = await $resultStore.DeleteAll(
    BotType.News,
    model.value.target,
    model.value.botId,
    selected.value.map((r: BotNewsResult) => r.id),
  );
  if (!ok) return;
  rows.value = rows.value.filter((r: BotNewsResult) => !selected.value.includes(r));
  if (rows.value.length > 0) {
    selected.value = [];
    return;
  }
  if ($nodeStore.Remove(model.value)) {
    emit('update', BotType.News);
  }
};

const onChange = () => {
  console.log('onChange', model.value);
  rows.value = model.value.rows as BotNewsResult[];
  selected.value = [];
};
onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <ArticleDialog v-model="dialog" :item="result" />
  <q-page padding>
    <NewsTable
      v-model:rows="rows"
      v-model:selected="selected"
      @post="onPost"
      @delete="onDelete"
      :target="model.target"
      :bot-id="model.botId"
      :label="model.label as string"
    />
  </q-page>
</template>
