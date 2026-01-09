<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useBotStore } from 'stores/bot-store';
import FrequencySelect from 'components/input/FrequencySelect.vue';
import type { Option, Prowler } from 'src/types/base';
import { clone, defaultOption, Options } from 'src/types/base';
import { useQuasar } from 'quasar';

// const emit = defineEmits<{
//   close: [void];
// }>();

const props = defineProps<{
  color: string;
  icon: string;
  prowler?: Prowler | null;
}>();

const $q = useQuasar();
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

  // followAll.value = temp.targets['*'] as boolean;
  // targets.value = Object.keys(temp.targets).filter((k) => k !== '*');
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
    blacklist:[],
    disabled: false,
  };


  if (await store.Save(model)) {
    $q.notify({
      timeout: 2000,
      color: 'green-13',
      textColor: 'grey-10',
      icon: 'mdi-check',
      position: 'bottom',
      message: `Saved`,
    });
  } else {
    $q.notify({
      timeout: 2000,
      color: 'red-13',
      icon: 'mdi-alert-circle-outline',
      position: 'bottom',
      message: `Saved`,
    });
  }
  console.debug(`SearchForm: ${(await store.Save(model)) ? `✅` : `❌`}`);
};
watch(props, onLoad);
onMounted(onLoad);
</script>

<template>
  <q-form @submit="onSubmit">
    <q-list dark>
      <!--      <q-item>-->
      <!--        <q-item-section>-->
      <!--          <div class="flex items-center q-gutter-sm">-->
      <!--            <div>-->
      <!--              <q-icon :name="icon" size="lg" :color="color" />-->
      <!--            </div>-->
      <!--            <div class="text-h5">Search</div>-->
      <!--            <q-space />-->
      <!--            <q-btn-->
      <!--              icon="mdi-close"-->
      <!--              color="grey"-->
      <!--              flat-->
      <!--              dense-->
      <!--              @click="-->
      <!--                onReset;-->
      <!--                emit('close');-->
      <!--              "-->
      <!--            />-->
      <!--          </div>-->
      <!--        </q-item-section>-->
      <!--      </q-item>-->
      <!--      <q-separator />-->
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
            :rules="[(val: string) => (val && val.length > 0) || 'Query is required']"
          >
            <template #prepend>
              <q-icon name="mdi-format-quote-open" :color="color" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <frequency-select v-model="frequency" :color="color" label="Repeat" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="followAll" :color="color" keep-color />
        </q-item-section>
        <q-item-section>
          <q-item-label>Include Landing Pages</q-item-label>
          <q-item-label caption>Crawl & Scrape result URLs?</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-btn
            class="full-width"
            label="Save"
            text-color="grey-10"
            type="submit"
            :color="color"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
