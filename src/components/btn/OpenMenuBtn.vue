<script setup lang="ts">
import { ref } from 'vue';
import ImgDialog from 'components/dialog/ImgDialog.vue';
import { openURL } from 'quasar';

defineProps<{
  pageUrl: string;
  title: string;
  imgUrl: string;
  htmlUrl: string;
}>();

const imgModel = ref<boolean>(false);
</script>

<template>
  <q-btn icon="mdi-dots-horizontal-circle-outline" color="primary" size="sm" dense flat>
    <q-menu transition-show="fade" transition-hide="fade" transition-duration="500">
      <q-list>
        <q-item clickable dense v-close-popup v-ripple @click="openURL(pageUrl)">
          <q-item-section avatar>
            <q-icon name="mdi-open-in-new" color="primary" size="xs" />
          </q-item-section>
          <q-item-section>Result Page URL</q-item-section>
        </q-item>
        <q-item @click="imgModel = true" :disable="!imgUrl" clickable dense v-close-popup v-ripple>
          <q-item-section avatar>
            <q-icon
              name="mdi-monitor-screenshot"
              :color="htmlUrl ? 'cyan-6' : 'grey-9'"
              size="xs"
            />
          </q-item-section>
          <q-item-section>PNG Screenshot</q-item-section>
        </q-item>
        <q-item
          @click="openURL(htmlUrl)"
          :disable="!htmlUrl"
          clickable
          dense
          v-close-popup
          v-ripple
        >
          <q-item-section avatar>
            <q-icon
              name="mdi-language-html5"
              :color="htmlUrl ? 'deep-orange-6' : 'grey-9'"
              size="xs"
            />
          </q-item-section>
          <q-item-section>HTML Content</q-item-section>
        </q-item>
        <q-item :disable="!imgUrl" clickable dense v-close-popup v-ripple>
          <q-item-section avatar>
            <q-icon
              name="mdi-code-json"
              :color="htmlUrl ? 'yellow-6' : 'grey-9'"
              size="xs"
            />
          </q-item-section>
          <q-item-section>JSON Data</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <ImgDialog v-model="imgModel" :title="title" :src="htmlUrl" />
</template>
<style lang="scss" scoped>
.q-item__section--avatar {
  color: inherit;
  min-width: 35px;
}
</style>
