<script setup lang="ts">
import { useBotStore } from 'stores/bot-store';
import { onMounted, ref, watch } from 'vue';
import SerpResultTabs from 'components/tabs/SerpResultTabs.vue';
import XFabAction from 'components/fab/XFabAction.vue';
import JsonDialog from 'components/dialog/JsonDialog.vue';
import ImgDialog from 'components/dialog/ImgDialog.vue';
import type { QTreeNode } from 'quasar';
import SearchForm from 'components/form/SearchForm.vue';
import { BotColor, BotIcon } from 'src/types/base';

const props = defineProps<{
  id?: string;
  date?: string;
}>();

const store = useBotStore();

const model = defineModel<QTreeNode>();

const fabModel = ref<boolean>(true);
const imgModel = ref<boolean>(false);
const jsonModel = ref<boolean>(false);
const htmlModel = ref<boolean>(false);

const setModel = () => {
  if (!props.date) {
    console.debug('Missing date');
    return;
  }
  const n = store.find('search', props.id, props.date);
  if (!n) {
    console.debug('Bot was not found');
    return;
  }
  model.value = n;
  console.log(JSON.stringify(model.value, null, 2));
};

onMounted(setModel);
watch(props, setModel);
// keep this open; the persistent flag is not working for moi
watch(fabModel, () => (fabModel.value = true));
</script>

<template>
  <SearchForm :color="BotColor('search')" :icon="BotIcon('search')" />
  <SerpResultTabs v-if="id && date" v-model:node="model as QTreeNode" />
  <q-page-sticky v-if="id && date && model" position="bottom-left" :offset="[18, 18]">
    <q-fab
      v-model="fabModel"
      color="yellow-10"
      direction="up"
      square
      persistent
      label="Files"
      text-color="grey-10"
      vertical-actions-align="left"
    >
      <template #icon="{ opened }">
        <q-icon
          :class="{ 'example-fab-animate--hover': opened !== true }"
          name="mdi-file-multiple"
        />
      </template>

      <template #active-icon="{ opened }">
        <q-icon :class="{ 'example-fab-animate': opened === true }" name="mdi-file-multiple" />
      </template>

      <x-fab-action
        color="yellow-9"
        icon="mdi-language-html5"
        label="HTML"
        @click="htmlModel = true"
      />
      <x-fab-action
        color="yellow-8"
        icon="mdi-monitor-screenshot"
        label="Screenshot"
        @click="imgModel = true"
      />
      <x-fab-action color="yellow-7" icon="mdi-code-json" label="JSON" @click="jsonModel = true" />
    </q-fab>
  </q-page-sticky>
  <ImgDialog
    v-if="id && date && model"
    v-model="imgModel"
    :title="`${props.id} - ${props.date}`"
    :src="model.data?.img"
  />
  <JsonDialog
    v-if="id && date && model"
    v-model="jsonModel"
    :title="`${props.id} - ${props.date}`"
    :content="model.data?.json.results"
  />
  <iframe v-if="id && date && model && htmlModel" :src="model.data?.html" style="display: none" />
</template>
