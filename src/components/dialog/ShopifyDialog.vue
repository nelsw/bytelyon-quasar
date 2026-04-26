<script setup lang="ts">
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import DateTimeInput from 'components/input/DateTimeInput.vue';
import OpenInNewBtn from 'components/btn/OpenInNewBtn.vue';
import { useArticleStore } from 'stores/article-store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const toolbar = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['unordered', 'ordered'],
  ['bold', 'italic', 'underline'],
  ['hr', 'link'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
    },
    'removeFormat'
  ],
  ['viewsource'],
  ['fullscreen']
];
const $store = useArticleStore();
</script>

<template>
  <ToolbarDialog v-model="$store.show" title="Shopify Blog Article Spinner" strict>
    <template #content>
      <div class="flex column q-col-gutter-y-lg q-pa-md">
        <div class="flex row q-col-gutter-x-md">

          <q-input class="flex col-grow" label="Title" v-model="$store.article.title" autofocus >
            <template #append>
              <OpenInNewBtn :url="$store.article.url" size="sm" />
            </template>
          </q-input>
          <DateTimeInput v-model="$store.article.publishedAt" class="flex col-md-shrink col-sm-12" />
        </div>
        <div class="flex row q-col-gutter-x-md">

          <q-select
            v-model="$store.article.keywords"
            class="flex col-grow"
            input-debounce="0"
            label="Keywords"
            new-value-mode="add-unique"
            hide-dropdown-icon
            multiple
            use-chips
            use-input
          />
          <q-select
            v-model="$store.article.tags"
            :options="[
            'boat fire',
            'e-bike fire',
            'e-scooter fire',
            'ev fire',
            'golf cart fire',
            'rv fire',
            ]"
            class="flex col-md-1 col-sm-12"
            label="Tag"
            input-debounce="0"
            hide-dropdown-icon
          />
        </div>

        <q-input label="Image" v-model="$store.article.image">
          <template #append>
            <OpenInNewBtn :url="$store.article.image" size="sm" />
          </template>
        </q-input>
        <q-input
          label="Excerpt"
          hint="A summary of the post; Appears on home page & blog page."
          v-model="$store.article.summary"
        />
        <q-input label="Content Generation Prompt" v-model="$store.article.prompt" />

        <div class="flex column q-col-gutter-y-sm">
          <div class="text-subtitle1">Content</div>
          <div>
            <q-editor
              v-model="$store.article.body"
              :toolbar="toolbar"
              min-height="25vh"
              dense
            />
          </div>
        </div>

        <div class="flex row q-col-gutter-x-md" style="">
          <div class="col-6">
            <q-btn @click="$store.show=false;" class="full-width" size="lg" color="pink" label="Cancel" outline />
          </div>
          <div class="col-6">
            <q-btn
              @click="$store.create"
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
