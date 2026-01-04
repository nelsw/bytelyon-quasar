<script setup lang="ts">
import { ref } from 'vue';
import LogoImg from 'components/img/LogoImg.vue';
import { useTokenStore } from 'stores/token-store';

const drawer = ref<boolean>(false);
const miniState = ref<boolean>(true);
const store = useTokenStore();
</script>

<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    mini-to-overlay
    :mini="miniState"
    :width="200"
    :breakpoint="500"
    @mouseenter="miniState = false"
    @mouseleave="miniState = true"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="25px">
              <LogoImg random />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <span class="text-bold">ByteLyon</span>
          </q-item-section>
        </q-item>

        <q-separator />



        <q-separator />

        <div class="absolute-bottom">
          <q-separator />
          <q-item clickable v-ripple @click="store.logout()">
            <q-item-section avatar>
              <q-icon name="mdi-logout" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
