<script setup lang="ts">
import {
  NewsIcon,
  SearchColor,
  SearchIcon,
  SitemapIcon,
} from 'src/types/base';
import { useRouter } from 'vue-router';
const $r = useRouter();
const onClick = async (s: string) => await $r.push({ name: 'bot', params: { bot: s } });
</script>

<template>
  <div class="full-width flex justify-center absolute-center q-gutter-md">
    <div class="full-width justify-center text-subtitle1">
      <div class="text-h3 text-center">
        Create a
        <q-icon name="mdi-new-box" size="2em" color="green-13" />
        bot
      </div>
    </div>
    <q-card class="cursor-pointer" style="width: 200px" @click="onClick('articles')">
      <q-card-section>
        <q-icon :name="NewsIcon" :color="SearchColor" size="4em" style="padding: 50px" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-center">
        <div class="q-pa-md text-h6">Article</div>
      </q-card-actions>
    </q-card>

    <q-card class="cursor-pointer" style="width: 200px" @click="onClick('sitemaps')">
      <q-card-section>
        <q-icon :name="SitemapIcon" :color="SearchColor" size="4em" style="padding: 50px" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-center">
        <div class="q-pa-md text-h6">Sitemap</div>
      </q-card-actions>
    </q-card>

    <q-card class="cursor-pointer" style="width: 200px" @click="onClick('searches')">
      <q-card-section>
        <q-icon :name="SearchIcon" :color="SearchColor" size="4em" style="padding: 50px" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-center">
        <div class="q-pa-md text-h6">Search</div>
      </q-card-actions>
    </q-card>
  </div>
</template>
