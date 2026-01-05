<script setup lang="ts">
import { NewsColor, NewsIcon } from 'src/types/base';
import { ref } from 'vue';
const unitModel = ref<string>('Daily');
const topic = ref<string>('');
const onCancel = () => {};
</script>

<template>
  <q-form>
    <q-list dark>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon :name="NewsIcon" size="lg" :color="NewsColor" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">News</q-item-label>
        </q-item-section>
      </q-item>
<q-separator />
      <q-item>
        <q-item-section>
          <q-input
            v-model="topic"
            :color="NewsColor"
            label="Topic"
            name="url"
            type="url"
            dense
            autofocus
            hint="What news topic should we aggregate?"
        /></q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            v-model="unitModel"
            :color="NewsColor"
            :options="['Hourly', 'Daily', 'Weekly', 'Do Not Repeat']"
            class="q-my-md"
            label="Repeat"
            dense
            hint="How often should we look for news?"
        /></q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <q-btn
            class="full-width"
            label="Create"
            :color="NewsColor"
            v-close-popup
            type="submit"
            text-color="grey-10"
          />
          <q-btn
            class="full-width q-mt-sm"
            label="Reset"
            :color="NewsColor"
            @click="onCancel"
            flat
            size="sm"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
