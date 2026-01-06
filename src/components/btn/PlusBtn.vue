<script setup lang="ts">
import { type Bot, BotEnum, Bots } from 'src/types/base';
import { ref } from 'vue';
import NewsForm from 'components/form/NewsForm.vue';
import SitemapForm from 'components/form/SitemapForm.vue';
import SearchForm from 'components/form/SearchForm.vue';

const dialog = ref(false)
const bot = ref<Bot>();
const onClick = (b: Bot): void => {
  bot.value = b
  dialog.value = true
}

</script>

<template>
  <q-btn    icon="mdi-plus" text-color="green-13" dense flat>
    <q-menu transition-show="scale" transition-hide="scale" auto-close>
      <q-list style="min-width: 100%" dense>
        <q-item v-for="b in Bots" :key="b.type" clickable v-close-popup @click="onClick(b)">
          <q-item-section>
            <div class="flex items-center justify-start">
              <q-icon :name="b.icon" :color="b.color" />
              <span class="q-ml-sm">{{ b.type }}</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <q-dialog v-model="dialog" no-backdrop-dismiss>
    <q-card flat style="min-width: 300px">
      <SearchForm
        v-if="bot?.type === BotEnum.Search"
        :color="bot.color"
        :icon="bot.icon"
        @close="dialog = false"
      />
      <SitemapForm v-else-if="bot?.type === 'sitemap'" :color="bot.color" :icon="bot.icon" />
      <NewsForm v-else-if="bot?.type === 'news'" :color="bot.color" :icon="bot.icon" />
    </q-card>
  </q-dialog>
</template>
