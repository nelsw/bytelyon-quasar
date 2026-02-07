<script setup lang="ts">
import { ref } from 'vue';
import LogoImg from 'components/img/LogoImg.vue';
import { Bots } from 'src/types/base';

const model = defineModel<boolean>({ required: false, default: true });
const miniState = ref<boolean>(false);
</script>

<template>
  <q-drawer v-model="model" show-if-above :mini="miniState" :width="350" :breakpoint="500">
    <q-list>
      <q-item clickable v-ripple :to="{ name: 'Dashboard' }">
        <q-item-section avatar>
          <q-avatar size="25px">
            <LogoImg />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <span class="text-bold text-white">ByteLyon</span>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        v-for="bot in Bots"
        :key="bot.type"
        dense-toggle
        :icon="bot.icon"
        :label="bot.type"
        expand-separator
      >
        <q-card>
          <q-card-section> arepublixchickentendersubsonsale.com </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="absolute-bottom">
        <q-separator />

        <q-item clickable v-ripple :to="{ name: 'account' }" color="dark" size="md" round>
          <q-item-section avatar>
            <q-avatar size="25px">
              <img src="https://avatars.githubusercontent.com/u/7100798?v=4" alt="User Avatar" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label> Profile </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple @click="miniState = !miniState" dense>
          <q-item-section avatar>
            <q-icon :name="`mdi-menu-${miniState ? 'close' : 'open'}`" color="grey-7" />
          </q-item-section>
          <q-item-section v-if="!miniState">
            <q-item-label class="text-grey-7"> Collapse </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-drawer>
</template>
