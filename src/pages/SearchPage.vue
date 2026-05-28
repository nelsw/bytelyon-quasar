<script setup lang="ts">
import type { Bot, BotType } from 'src/types/model';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBotStore } from 'src/stores/bot-store';
import { computed, onMounted, ref, watch } from 'vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import useSearchApi from 'src/composable/api/useSearchApi';
import { Rows, type Serp } from 'src/types/serp';
import { ts } from 'src/types/id';
import { screenshot } from 'src/types/screenshot';
import SerpTable from 'components/table/SerpTable.vue';

interface Option {
  label: string;
  value: string;
}

const color = 'amber-13';

const props = defineProps<{
  botType: BotType;
  target: string;
}>();

const $bots = useBotStore();
const $searches = useSearchApi();

const serp = ref<Serp>();
const options = ref<Option[]>([]);
const option = ref<Option>();
const frequency = ref<number>(1);
const blackList = ref<string[]>([]);
const headless = ref<boolean>(true);

const onDeleteBot = async () => await $bots.Delete(props.botType, props.target);

const onUpdate = async () =>
  await $bots.Save(props.botType, props.target, frequency.value, blackList.value, headless.value);

const onChangeBot = async () => {
  await $bots.Load(props.botType);
  const bot = $bots.model.get(props.botType, []).find((b) => b.target === props.target) as Bot;
  frequency.value = bot.frequency;
  blackList.value = bot.blackList ?? [];
  headless.value = bot.headless ?? true;

  options.value = (await $searches.getIds(props.target)).map((id) => {
    return {
      label: ts(id),
      value: id,
    };
  });
  option.value = options.value[0];
  if (option.value?.value) serp.value = await $searches.getSerp(props.target, option.value?.value);
};

const onDeleteResult = async () => {
  const id = option.value?.value;
  if (!id || !(await $searches.deleteSerp(props.target, id))) return;
  options.value = options.value?.filter((o) => o.value != id);
  if (options.value && options.value.length > 0) {
    option.value = options.value[options.value?.length - 1];
  }
};
const url = computed(() => `google.com/search?q=${props.target.replaceAll(' ', '+')}`);
const rows = computed(() => {
  return Rows(serp.value);
});
watch(props, onChangeBot);
watch(option, async (opt) => {
  if (!opt) return;
  serp.value = await $searches.getSerp(props.target, opt.value);
});
onMounted(onChangeBot);
</script>

<template>
  <div class="q-px-sm q-gutter-y-sm">
    <div>
      <q-card flat style="background-color: transparent">
        <q-card-section>
          <div class="flex row justify-between items-center">
            <div v-if="!$bots.busy" class="flex row items-center q-gutter-sm">
              <div class="text-h5 text-weight-medium text-uppercase">
                {{ target }}
              </div>
              <BrowserSelect v-model="headless" @update:model-value="onUpdate" :color="color" />
              <FrequencySelect v-model="frequency" @update:model-value="onUpdate" :color="color" />
              <BlackListSelect v-model="blackList" @update:model-value="onUpdate" :color="color" />
            </div>
            <div class="flex row q-gutter-x-sm">
              <TrashBtn @delete="onDeleteBot" size="md">
                <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
                  Delete Bot
                </q-tooltip>
              </TrashBtn>
            </div>
          </div>
          <q-separator spaced />
          <div class="flex row justify-between">
            <div class="flex row justify-start items-center">
              <div>
                <q-select
                  v-model="option"
                  :options="options"
                  hide-dropdown-icon
                  dense
                  hide-hint
                  hide-bottom-space
                  filled
                  options-dense
                  square
                >
                  <template #prepend>
                    <q-icon name="mdi-calendar-clock-outline" color="primary" />
                  </template>
                </q-select>
              </div>
              <div class="q-ml-sm">
                <ViewImgBtn title="Google SERP" :url="screenshot(url, option?.value)" />
              </div>
            </div>

            <div class="flex row justify-start q-gutter-x-sm">
              <TrashBtn @click="onDeleteResult()" outline>
                <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
                  Delete Result
                </q-tooltip>
              </TrashBtn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-mx-sm q-gutter-sm">
      <SerpTable v-model="rows" :id="option?.value"/>
    </div>
  </div>
</template>
