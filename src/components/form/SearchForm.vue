<script setup lang="ts">
import { ref } from 'vue';
import { SearchColor, SearchIcon } from 'src/types/base';

const color = SearchColor;
const unitOptions = ['Hourly', 'Daily', 'Weekly', 'Do Not Repeat'];
const query = ref<string>('');
const unitModel = ref<string>(unitOptions[1] as string);
const followAll = ref<boolean>(true);
const targets = ref<string[]>([]);

const onCancel = () => {
  query.value = '';
  unitModel.value = 'Daily';
  followAll.value = true;
  targets.value = [];
};
</script>

<template>
  <q-form>
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-icon :name="SearchIcon" size="lg" :color="color" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h5">Search</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-input
            v-model="query"
            :color="color"
            label="Query"
            name="query"
            type="text"
            autofocus
            hint="What are we Googling?"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            v-model="unitModel"
            :color="color"
            :options="['Hourly', 'Daily', 'Weekly', 'Do Not Repeat']"
            label="Repeat"
            hint="How often should we Google this?"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-toggle
            v-model="followAll"
            checked-icon="mdi-check"
            :color="color"
            :label="`${followAll ? 'Crawl' : 'Ignore'}  Result Pages`"
            unchecked-icon="mdi-close"
          />
          <div v-if="followAll" class="text-grey" style="font-size: 11px">
            Scrape the Google SERP & each result page.
          </div>
          <div v-else class="text-grey" style="font-size: 11px">
            Do not Crawl; Only Scrape the Google SERP.
          </div>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            label="Exclusions"
            v-model="targets"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            :color="color"
            :hint="`Domains to explicitly ${followAll ? 'Ignore' : 'Crawl'}`"
          />
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item>
        <q-item-section>
          <q-btn
            class="full-width"
            label="Create"
            :color="color"
            v-close-popup
            type="submit"
            text-color="grey-10"
          />
          <q-btn
            class="full-width q-mt-sm"
            label="Reset"
            :color="color"
            @click="onCancel"
            flat
            size="sm"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
