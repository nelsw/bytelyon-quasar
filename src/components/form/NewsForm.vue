<script setup lang="ts">
import { defaultOption, NewsColor, NewsIcon, type Option } from 'src/types/base';
import { ref } from 'vue';
import ResetBtn from 'components/btn/ResetBtn.vue';
import CreateBtn from 'components/btn/CreateBtn.vue';
import FrequencySelect from 'components/input/FrequencySelect.vue';

const topic = ref<string>('');
const frequency = ref<Option>(defaultOption());

const onSubmit = () => {};
const onReset = () => {};
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset">
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
        />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <frequency-select
            v-model="frequency"
            :color="NewsColor"
            hint="How often should we look for news?"
            label="Repeat"
          />
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <CreateBtn :color="NewsColor" />
          <ResetBtn :color="NewsColor" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
