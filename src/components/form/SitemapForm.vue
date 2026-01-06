<script setup lang="ts">
import type { Option } from 'src/types/base';
import { defaultOption, SitemapColor, SitemapIcon } from 'src/types/base';
import { ref } from 'vue';
import CreateBtn from 'components/btn/CreateBtn.vue';
import ResetBtn from 'components/btn/ResetBtn.vue';
import FrequencySelect from 'components/input/FrequencySelect.vue';

const url = ref<string>('');
const frequency = ref<Option>(defaultOption());

const onSubmit = () => {};
const onReset = () => {};
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-list dark>
      <q-item>
        <q-item-section avatar>
          <q-icon :name="SitemapIcon" size="lg" :color="SitemapColor" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">Sitemap</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-input
            v-model="url"
            :color="SitemapColor"
            label="URL"
            name="url"
            type="url"
            dense
            autofocus
            hint="What is the site address to map?"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <frequency-select
            v-model="frequency"
            :color="SitemapColor"
            hint="How often should we map this site?"
            label="Repeat"
          />
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <CreateBtn :color="SitemapColor" />
          <ResetBtn :color="SitemapColor" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
