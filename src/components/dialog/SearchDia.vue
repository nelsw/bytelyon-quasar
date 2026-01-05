<script setup lang="ts">
import { useSearchStore } from 'stores/search-store';
import { ref } from 'vue';
import { ulid } from 'ulid';

const color = `green-13`;
const store = useSearchStore();
const model = defineModel<boolean>({ default: false });
const query = ref<string>('');
const unitModel = ref<string>('Daily');
const followAll = ref<boolean>(true);
const targets = ref<string[]>([]);
const onSubmit = async () => {
  const q = query.value;
  onCancel();
  await store.create({
    id: ulid(),
    query: q,
    targets: {} as Map<string, boolean>,
    pages: [],
  });
};

const onCancel = () => {
  query.value = '';
  model.value = false;
};
</script>

<template>
  <q-dialog v-model="model" persistent>
    <q-card flat style="min-width: 300px">
      <q-form @submit="onSubmit">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="mdi-new-box" size="lg" :color="color" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">Search</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-section>
          <q-input
            v-model="query"
            :color="color"
            label="Query"
            name="query"
            type="text"
            dense
            autofocus
            hint="What are we Googling?"
          />
          <q-select
            v-model="unitModel"
            :color="color"
            :options="['Hourly', 'Daily', 'Weekly', 'Do Not Repeat']"
            class="q-my-md"
            label="Repeat"
            dense
            hint="How often should we Google this?"
          />
          <q-toggle
            v-model="followAll"
            checked-icon="mdi-check"
            :color="color"
            :label="`${followAll ? 'Crawl' : 'Ignore'}  Result Pages`"
            unchecked-icon="mdi-close"
            class="q-my-md"
            dense
          />
          <div v-if="followAll" class="text-grey" style="font-size: 11px">
            Scrape the Google SERP & each result page.
          </div>
          <div v-else class="text-grey" style="font-size: 11px">
            Do not Crawl; Only Scrape the Google SERP.
          </div>
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
            dense
            :hint="`Domains to explicitly ${followAll ? 'Ignore' : 'Crawl'}`"
            class="q-mt-md"
          />
        </q-card-section>
        <q-separator />
        <q-card-section>
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
            label="Cancel"
            :color="color"
            @click="onCancel"
            flat
            size="sm"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<style lang="scss">
.q-toggle__inner--truthy .q-toggle__thumb .q-icon {
  color: #333;
  opacity: 1;
}
</style>
