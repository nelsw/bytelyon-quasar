<script setup lang="ts">
import { BotType } from 'src/types/model';
import HeaderBtnDropdown from 'components/btn/dropdown/HeaderBtnDropdown.vue';
import { useRoute } from 'vue-router';
import { useBots } from 'stores/bots';

const $bots = useBots();
const $route = useRoute();
</script>

<template>
  <q-btn-group spread square stretch>
    <HeaderBtnDropdown
      :active="$route.path === '/prompt'"
      color="teal-3"
      icon="mdi-flask-plus"
      label="Prompt"
      to="/prompt"
    />
    <HeaderBtnDropdown
      :active="$route.path === '/article'"
      color="lime-3"
      icon="mdi-receipt-text-send"
      label="Article"
      to="/article"
    />
    <HeaderBtnDropdown
      :active="$route.params.botType === 'news'"
      icon="mdi-newspaper"
      color="purple-3"
      label="News"
    >
      <q-list>
        <q-item :to="`/${BotType.News}`" clickable v-ripple active-class="text-green-13">
          <q-item-section class="q-pr-none" style="min-width: 32px" avatar>
            <q-icon name="mdi-plus" color="green-13" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Bot</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          v-for="e in $bots.model
            .get(BotType.News, [])
            .sort((a, b) => a.target.localeCompare(b.target))"
          :key="e.target"
          :to="`/${BotType.News}/${e.id}`"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>
              {{ e.target }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </HeaderBtnDropdown>
    <HeaderBtnDropdown
      :active="$route.params.botType === 'search'"
      icon="mdi-web"
      color="deep-purple-3"
      label="Search"
    >
      <q-list>
        <q-item :to="`/${BotType.Search}`" clickable v-ripple>
          <q-item-section class="q-pr-none" style="min-width: 32px" avatar>
            <q-icon name="mdi-plus" color="green-13" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Bot</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          v-for="e in $bots.model
            .get(BotType.Search, [])
            .sort((a, b) => a.target.localeCompare(b.target))"
          :key="e.target"
          :to="`/${BotType.Search}/${e.id}`"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>
              {{ e.target }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </HeaderBtnDropdown>
    <HeaderBtnDropdown
      :active="$route.params.botType === 'sitemap'"
      icon="mdi-sitemap"
      color="indigo-3"
      label="Sitemap"
    >
      <q-list>
        <q-item :to="`/${BotType.Sitemap}`" clickable v-ripple>
          <q-item-section class="q-pr-none" style="min-width: 32px" avatar>
            <q-icon name="mdi-plus" color="green-13" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Bot</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          v-for="e in $bots.model
            .get(BotType.Sitemap, [])
            .sort((a, b) => a.target.localeCompare(b.target))"
          :key="e.target"
          :to="`/${BotType.Sitemap}/${e.id}`"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>
              {{ e.target }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </HeaderBtnDropdown>
  </q-btn-group>
</template>
