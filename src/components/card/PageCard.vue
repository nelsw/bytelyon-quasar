<script setup lang="ts">
import { computed, ref } from 'vue';
import { type Page } from 'src/types/model';
import SafeImg from 'components/img/SafeImg.vue';
import ChevronIcon from 'components/icon/ChevronIcon.vue';

const expanded = ref(false);
const props = defineProps<{
  page: Page;
}>();
const description = computed(() => {
  if (props.page.meta['description']) {
    return props.page.meta['description'];
  }
  if (props.page.meta['og:description']) {
    return props.page.meta['og:description'];
  }
  if (props.page.meta['twitter:description']) {
    return props.page.meta['twitter:description'];
  }
  return '';
});
</script>

<template>
  <q-card flat bordered>
    <q-card-section horizontal>
      <q-card-section>
        <div class="text-caption">{{ new Date(page.createdAt).toLocaleString() }}</div>
        <div class="text-subtitle1">{{ page.title }}</div>
        <div class="text-subtitle2">{{ description }}</div>
        <q-btn @click="expanded = !expanded" color="grey" label="Raw Data" size="sm" dense flat>
          <ChevronIcon :expanded="expanded" />
        </q-btn>
      </q-card-section>
      <SafeImg :s3Key ="page.screenshotKey" :ratio="10 / 4" class="col-3" open/>
    </q-card-section>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section>
          <div class="text-caption text-grey">
            <span v-for="(v, k) in Object.entries(page)" :key="k">
              {{ v[0] }}: {{ v[1] }}
              <br v-if="k !== Object.entries(page).length - 1" />
            </span>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
