<script setup lang="ts">
import { useProfileStore } from 'stores/profile-store';
import { onMounted } from 'vue';
import { useTokenStore } from 'stores/token-store';

const model = defineModel<boolean>({ required: true });
const profileStore = useProfileStore();
const tokenStore = useTokenStore();
onMounted(profileStore.load);
</script>

<template>
  <q-drawer v-model="model" side="right" bordered :width="225" :breakpoint="500">
    <q-scroll-area class="fit">
      <q-card class="my-card" flat square>
        <q-img src="~assets/guest-background.png" />

        <q-card-section>
          <q-avatar
            size="50px"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          >
            <img src="~assets/guest-avatar.png" alt="Guest Avatar" />
          </q-avatar>
          <div class="row no-wrap items-center">
            <div class="col text-caption text-center">{{ profileStore.proxy.name }}</div>
          </div>
        </q-card-section>

        <q-separator />

      </q-card>

      <div class="absolute-bottom">
        <q-separator />
        <q-btn
          class="full-width"
          flat
          no-caps
          :ripple="false"
          @click="tokenStore.logout()"
        >
          <div class="flex q-gutter-x-sm">
            <div class="text-grey">Logout</div>
            <q-icon name="mdi-logout" color="grey" />
          </div>
        </q-btn>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped lang="scss"></style>
