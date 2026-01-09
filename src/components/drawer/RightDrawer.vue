<script setup lang="ts">
import type { Prowler } from 'src/types/base';
import { BotColor, BotIcon } from 'src/types/base';
import { onMounted, ref, watch } from 'vue';
import { useBotStore } from 'stores/bot-store';
import { QInput } from 'quasar';
import FrequencyInput from 'components/input/FrequencyInput.vue';

const props = defineProps<{
  type: string;
  id?: string;
  date?: string;
}>();

const store = useBotStore();
const model = defineModel<boolean>({ required: false, default: false });
const prowler = ref<Prowler>({
  id: '',
  type: props.type,
  frequency: 900000000000, // 15min of nanos
  blacklist: [],
  disabled: false,
});

const onSubmit = async () => {
  await store.Save(prowler.value)
};

const setModel = () => {
  prowler.value = {
    id: '',
    type: props.type,
    frequency: 900000000000, // 15min of nanos
    blacklist: [],
    disabled: false,
  };
  if (props.date !== undefined && props.date !== '') {
    model.value = false;
    return
  }
  const prowlerNode = store.find(props.type, props.id);
  if (prowlerNode !== null && prowlerNode.data !== undefined) {
    prowler.value = prowlerNode.data
    return
  }
}
watch(props, setModel)
onMounted(setModel);
</script>

<template>
  <q-drawer v-model="model" side="right"  bordered :width="450" :breakpoint="600">
    <q-scroll-area style="height: calc(100%)">
      <q-form @submit="onSubmit">
        <div class="q-mx-sm q-my-sm full-height">
          <div class="flex items-center">
            <q-icon :name="BotIcon(type)" size="md" :color="BotColor(type)" />
            <div class="text-h5 text-capitalize q-ml-sm">{{ type }}</div>
          </div>
          <q-separator spaced/>
          <q-input
            v-model="prowler.id"
            :color="BotColor(type)"
            :label="type === 'sitemap' ? 'URL' : type === 'news' ? 'Topic' : 'Query'"
            :name="type === 'sitemap' ? 'url' : type === 'news' ? 'topic' : 'query'"
            :type="type === 'sitemap' ? 'url' : 'text'"
            :rules="[(val: string) => (val && val.length > 0) || 'Field cannot be empty']"
            lazy-rules

            :disable="id !== ''&& id !== undefined"
          >
            <template #before>
              <q-icon name="mdi-format-quote-open" :color="BotColor(type)" size="md" />
            </template>
          </q-input>

          <q-select
            v-if="type !== 'sitemap'"
            :color="BotColor(type)"
            v-model="prowler.blacklist"
            class="q-mb-md"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            label="Blacklist"
            :hint="type === 'search'
            ? 'Prohibit Crawling & Scraping from these domains'
            : 'Ignore articles that contain these domains or keywords'"
          >
            <template #before>
              <q-icon name="mdi-robot-off" :color="BotColor(type)" size="sm"/>
            </template>
          </q-select>

          <FrequencyInput
            v-if="date === undefined"
            :color="BotColor(type)"
            v-model="prowler.frequency"
          />

          <div v-if=" id !== undefined && date === undefined" class="flex justify-start items-center q-mt-md">
            <q-icon name="mdi-play-pause" :color="BotColor(type)" size="sm"/>
            <q-checkbox
              class="q-ml-sm"
              v-model="prowler.disabled"
              :color="BotColor(type)"
              label="Disabled"
            />
          </div>


          <q-btn class="full-width q-mt-md" label="Save" type="submit" :color="BotColor(type)" />
        </div>

      </q-form>
    </q-scroll-area>
  </q-drawer>
</template>
