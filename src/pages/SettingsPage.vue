<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { QInput } from 'quasar';
import LogoBtn from 'components/btn/LogoBtn.vue';
import BotCard from 'components/card/BotCard.vue';
import BotTree from 'components/tree/BotTree.vue';

const splitterModel = ref(300);
const filter = ref<string>('');

onMounted(() => {
  // selected.value = 'Search Bot (new)';
  // treeRef.value?.setExpanded('Search Bot (new)', true);
});
</script>
<template>
  <q-page style="height: 100vh">
    <!--      separator-class="bg-cyan"-->
    <!--      separator-style="width: 3px"-->
    <q-splitter
      v-model="splitterModel"
      class="full-height"
      unit="px"
      separator-style="color:#ffffff1e;width:.5px;"
    >
      <template v-slot:before>
        <div class="bg-dark full-height">
          <div class="flex q-pa-md q-gutter-md cursor-pointer">
            <LogoBtn />
            <span class="text-h5 text-grey-5 text-weight-medium">ByteLyon</span>
          </div>
          <q-separator />
          <q-input
            ref="my-input"
            class="q-pt-md q-px-md"
            v-model="filter"
            color="primary"
            placeholder="Filter"
            autofocus
            clearable
            clear-icon="mdi-close"
            dense
            borderless
          >
            <template #prepend>
              <q-icon name="mdi-filter-variant" color="blue-grey-5" />
            </template>
          </q-input>
          <q-separator inset />
          <div class="bg-dark">
            <BotTree />
          </div>

          <div class="absolute-bottom bg-dark">
            <q-separator />
            <q-btn
              flat
              square
              :to="{ name: 'settings' }"
              color="dark"
              icon="mdi-cog"
              text-color="grey-8"
              label="Settings"
              class="full-width"
              align="left"
              no-caps
            />
          </div>
        </div>
      </template>

      <template v-slot:after>
        <BotCard />
      </template>
    </q-splitter>
  </q-page>
</template>
<style lang="scss">
.q-tree > div:nth-child(1) > div:nth-child(1) > i:nth-child(2) {
  display: none !important;
}
.q-tree > div:nth-child(2) > div:nth-child(1) > i:nth-child(2) {
  display: none !important;
}
.q-tree > div:nth-child(3) > div:nth-child(1) > i:nth-child(2) {
  display: none !important;
}
</style>
