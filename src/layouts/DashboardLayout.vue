<script setup lang="ts">
import LogoImg from 'components/img/LogoImg.vue';
import { onMounted, ref, useTemplateRef } from 'vue';
import BotTree from 'components/tree/BotTree.vue';
import HeaderBreadCrumbs from 'components/breadcrumbs/HeaderBreadCrumbs.vue';
import { QInput } from 'quasar';
import MenuBtn from 'components/btn/MenuBtn.vue';

const drawer = ref<boolean>(true);
const selected = ref<string>('');
const expanded = ref<string[]>([]);
const search = ref<string>('');
const isCmd = ref(false);
const isFwdSlash = ref(false);
const input = useTemplateRef<QInput>('my-input');

const onKeyPress = (e: KeyboardEvent) => {
  console.log('onKeyPress', e);
  if (e.key === 'Meta') {
    isCmd.value = true;
    return;
  }
  if (e.key === '/') {
    isFwdSlash.value = true;
    if (isCmd.value) {
      input.value?.focus();
    }
    return;
  }
  isCmd.value = false;
  isFwdSlash.value = false;
};
onMounted(() => {
  document.addEventListener('keydown', onKeyPress);
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="drawer" side="left" show-if-above bordered :width="225" :breakpoint="600">
      <q-scroll-area class="fit">
        <BotTree v-model:selected="selected" v-model:expanded="expanded" />
      </q-scroll-area>
    </q-drawer>
    <q-header class="bg-dark" bordered>
      <q-bar class="bg-dark text-white" dark>
        <div class="flex row items-center" style="min-width: 187px">
          <div class="flex items-center q-mr-lg">
            <q-avatar size="sm">
              <LogoImg random />
            </q-avatar>
            <div class="text-weight-regular q-ml-sm">ByteLyon</div>
          </div>
        </div>
        <MenuBtn v-model="drawer" />
        <q-separator vertical inset />
        <HeaderBreadCrumbs class="q-pl-sm" />
        <q-space />
        <q-separator vertical inset />
        <q-input
          ref="my-input"
          class="q-ml-sm"
          v-model="search"
          dense
          borderless
          placeholder="Search ..."
          dark
          style="max-width: 200px"
        >
          <template #append>
            <div
              class="text-grey text-caption"
              style="border: 1px solid #333 !important; border-radius: 4px; padding: 1px 4px"
            >
              ⌘/
            </div>
          </template>
        </q-input>
      </q-bar>
    </q-header>
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
.q-separator--dark {
  background-color: rgb(255, 255, 255, 0.12);
}
.q-header.bg-dark,
.q-drawer--left.q-drawer--bordered,
body.body--dark.q-drawer {
  border-color: rgb(255, 255, 255, 0.12) !important;
}
</style>
