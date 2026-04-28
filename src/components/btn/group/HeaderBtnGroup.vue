<script setup lang="ts">
import { BotType, BotTypes } from 'src/types/model';
import { onMounted } from 'vue';
import HeaderBtnDropdown from 'components/btn/dropdown/HeaderBtnDropdown.vue';
import { useRoute, useRouter } from 'vue-router';
import { useBots } from 'stores/bots';

const $bots = useBots();
const $route = useRoute();
const $router = useRouter();

onMounted(async () => {
  await Promise.all(BotTypes.map((botType) => $bots.Load(botType)));
});
</script>

<template>
  <q-btn-group spread square stretch>
    <HeaderBtnDropdown
      @click="$router.push('/prompt')"
      :active="$route.path === '/prompt'"
      color="teal-3"
      icon="mdi-flask-plus"
      label="Prompt"
      $
    />
    <HeaderBtnDropdown
      @click="$router.push('/article')"
      :active="$route.path === '/article'"
      color="lime-3"
      icon="mdi-receipt-text-send"
      label="Article"
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
          :disable="$bots.busy"
          :to="`/${BotType.News}/${e.id}/results`"
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
          :disable="$bots.busy"
          :to="`/${BotType.Search}/${e.id}/results`"
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
    <q-btn-dropdown dropdown-icon="mdi-sitemap" text-color="indigo-3" auto-close noIconAnimation>
      <template v-if="$q.screen.gt.xs" #label>
        <span class="q-ml-sm text-white"> Sitemap </span>
      </template>
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
          :disable="$bots.busy"
          :to="`/${BotType.Sitemap}/${e.id}/results`"
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
    </q-btn-dropdown>
  </q-btn-group>
</template>
