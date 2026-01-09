<script setup lang="ts">
import {
  NewsColor,
  NewsIcon,
  SearchColor,
  SearchIcon,
  SitemapColor,
  SitemapIcon,
} from 'src/types/base';
import { useRouter } from 'vue-router';

const $r = useRouter();
const onClick = async (s: string) => await $r.push({ name: s });
</script>

<template>
  <q-page class="flex items-center text-center">
    <div class="full-width flex justify-center q-gutter-md" style="margin-bottom: 60px">
      <div class="full-width justify-center text-subtitle1">
        <div class="col">
          <span class="text-h3">
            Create a
            <q-icon name="mdi-new-box" size="2em" color="green-13" />
            bot
          </span>
        </div>
      </div>
      <q-card class="cursor-pointer" style="width: 200px" @click="onClick('search')">
        <q-card-section>
          <q-icon :name="SearchIcon" :color="SearchColor" size="4em" style="padding: 50px" />
        </q-card-section>
        <q-separator />
        <q-card-actions class="flex justify-center">
          <div class="q-pa-md text-h6">Search</div>
        </q-card-actions>
      </q-card>
      <q-card class="cursor-pointer" style="width: 200px" @click="onClick('news')">
        <q-card-section>
          <q-icon :name="NewsIcon" :color="NewsColor" size="4em" style="padding: 50px" />
        </q-card-section>
        <q-separator />
        <q-card-actions class="flex justify-center">
          <div class="q-pa-md text-h6">News</div>
        </q-card-actions>
      </q-card>
      <q-card class="cursor-pointer" style="width: 200px" @click="onClick('sitemap')">
        <q-card-section>
          <q-icon :name="SitemapIcon" :color="SitemapColor" size="4em" style="padding: 50px" />
        </q-card-section>
        <q-separator />
        <q-card-actions class="flex justify-center">
          <div class="q-pa-md text-h6">Sitemap</div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
