<script setup lang="ts">
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import { ref } from 'vue';
const model = defineModel<boolean>({ required: true });

const title = ref<string>('');
const summary = ref<string>('');
const prompt = ref<string>(
  'You are a lithium ion fire blanket salesman for a company name FireFibers',
);
const body = ref<string>('');
</script>

<template>
  <ToolbarDialog v-model="model" title="Shopify Blog Article Spinner" persistent>
    <template #content>
      <div class="flex q-pa-md column q-gutter-md">
        <div></div>
        <q-input label="Title" v-model="title" class="text-h6" autofocus />
        <q-input label="Summary" v-model="summary" />
        <q-input label="Content Prompt" v-model="prompt" />
        <div>
          <span class="text-body1">Content Body</span>
          <br />
          <span class="text-caption text-grey-4">Content used by AI to </span>
          <q-editor class="q-mt-sm" v-model="body" />
        </div>
      </div>
    </template>
  </ToolbarDialog>
</template>
