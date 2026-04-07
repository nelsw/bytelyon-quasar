<script setup lang="ts">
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import { onMounted, onUpdated, ref } from 'vue';
import DateTimeInput from 'components/input/DateTimeInput.vue';
import type { Article, NewsBotResult } from 'src/types/model';
import { date } from 'quasar';
import useApi from 'src/composable/useApi';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';

const $api = useApi();

const show = defineModel<boolean>('show', { required: false, default: false });
const result = defineModel<NewsBotResult | null>('result', { required: true });

const article = ref<Article>({
  title: '',
  body: '',
  summary: '',
  tags: [],
  image: '',
  prompt: 'You are a lithium ion fire blanket salesman for a company named FireFibers',
  publishedAt: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
});

const onCreate = async () => (show.value = !(await $api.CreateArticle(article.value)));

const onChange = () => {
  if (result.value === null) return;
  article.value.title = result.value.title;
  article.value.body = result.value.body.map((s: string) => `<p>${s}</p>`).join('');
  article.value.summary = result.value.description;
  article.value.image = result.value.image;
  if (date.isValid(result.value.publishedAt)) {
    article.value.publishedAt = date.formatDate(result.value.publishedAt, 'YYYY-MM-DD HH:mm');
  }
};

onUpdated(onChange);
onMounted(onChange);
</script>

<template>
  <ToolbarDialog v-model="show" title="Shopify Blog Article Spinner" stubborn persistent>
    <template #content>
      <div class="flex column q-col-gutter-y-lg q-pa-md">
        <div class="flex row q-col-gutter-x-md">
          <q-input class="flex col-grow" label="Title" v-model="article.title" autofocus />
          <DateTimeInput v-model="article.publishedAt" class="flex col" />
        </div>
        <q-select
          v-model="article.tags"
          class="flex col-grow"
          input-debounce="0"
          label="Tags"
          new-value-mode="add-unique"
          hide-dropdown-icon
          multiple
          use-chips
          use-input
        />
        <q-input label="Image" hint=".png required" v-model="article.image">
          <template #append>
            <OpenInNewBtn :url="article.image" size="sm" />
          </template>
        </q-input>
        <q-input
          label="Excerpt"
          hint="A summary of the post; Appears on home page & blog page."
          v-model="article.summary"
        />
        <q-input label="Content Generation Prompt" v-model="article.prompt" />

        <div class="flex column q-col-gutter-y-sm">
          <div class="text-subtitle1">Content</div>
          <div>
            <q-editor
              v-model="article.body"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify'],
                  },
                ],
                ['unordered', 'ordered'],
                ['bold', 'italic', 'underline'],
                ['hr', 'link'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
                  },
                  'removeFormat',
                ],
                ['viewsource'],
                ['fullscreen'],
              ]"
              min-height="25vh"
              dense
            />
          </div>
        </div>

        <div class="flex row q-col-gutter-x-md" style="">
          <div class="col-6">
            <q-btn v-close-popup class="full-width" size="lg" color="pink" label="Cancel" outline />
          </div>
          <div class="col-6">
            <q-btn
              @click="onCreate()"
              class="full-width"
              size="lg"
              color="green-13"
              text-color="dark"
              label="Create"
            />
          </div>
        </div>
      </div>
    </template>
  </ToolbarDialog>
</template>
