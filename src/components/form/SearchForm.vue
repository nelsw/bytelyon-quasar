<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useBotStore } from 'stores/bot-store';
import FrequencySelect from 'components/input/FrequencySelect.vue';
import type { Option, Prowler } from 'src/types/base';
import { clone, defaultOption, Options } from 'src/types/base';

const props = defineProps<{
  color: string;
  icon: string;
  prowler?: Prowler | null;
}>();

const query = ref<string>('');
const frequency = ref<Option>(defaultOption());
const followAll = ref<boolean>(true);
const targets = ref<string[]>([]);

const store = useBotStore();

// const loadFromModel = () => {};
const onLoad = () => {
  console.log('SearchForm mounted', JSON.stringify(props.prowler, null, 2));
  if (!props.prowler) {
    onReset();
    return;
  }

  const temp = clone(props.prowler);
  query.value = temp.id;
  for (const option of Options) {
    if (option.value === temp.frequency) {
      frequency.value = option;
      break;
    }
  }

  followAll.value = temp.targets['*'] as boolean;
  targets.value = Object.keys(temp.targets).filter((k) => k !== '*');
};
const onReset = () => {
  query.value = '';
  frequency.value = defaultOption();
  followAll.value = true;
  targets.value = [];
};

const onSubmit = async () => {
  const model: Prowler = {
    id: query.value,
    type: 'search',
    frequency: frequency?.value?.value as number,
    targets: {
      '*': followAll.value,
    },
  };

  for (const target of targets.value) {
    model.targets[target] = !followAll.value;
  }

  console.debug(`SearchForm: ${(await store.Save(model)) ? `✅` : `❌`}`);
};
watch(props, onLoad);
onMounted(onLoad);
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <q-list dark>
      <q-item>
        <q-item-section avatar>
          <q-icon :name="icon" size="lg" :color="color" />
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
            dense
            autofocus
            hint="What are we searching?"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <frequency-select
            v-model="frequency"
            :color="color"
            label="Repeat"
            hint="How often should we search this?"
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
            :label="`${followAll ? 'Exclusions' : 'Inclusions'}`"
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
          <q-btn class="full-width" label="Save" text-color="grey-10" type="submit" :color="color" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
