<script setup lang="ts">
import type { Bot, BotType, PageData, SerpResult, SearchBotData } from 'src/types/model';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBots } from 'stores/bots';
import { onMounted, ref, watch } from 'vue';
import { useSearches } from 'stores/searches';
import SearchTable from 'components/table/SearchTable.vue';
import SerpTable from 'components/table/SerpTable.vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';

const color = 'amber-13'

const props = defineProps<{
  botType: BotType,
  botId: string;
}>()

const $bots = useBots();
const $results = useSearches();

const searchData = ref<SearchBotData>();
const serpSections = ref<string[]>([]);
const timestamp = ref('');
const timestamps = ref<string[]>([]);
const target = ref('');
const frequency = ref<number>(1);
const blackList = ref<string[]>([]);
const headless = ref<boolean>(true);

const onDeleteBot = async () => await $bots.Delete(props.botType, props.botId);

const onUpdate = async () =>
  await $bots.Save(
    props.botType,
    props.botId,
    target.value,
    frequency.value,
    blackList.value,
    headless.value,
  );

const onChangeBot = async () => {
  await $results.Load(props.botId);
  const bot = $bots.model
    .get(props.botType, [])
    .find((b) => b.id === (props.botId)) as Bot;

  target.value = bot.target;
  frequency.value = bot.frequency;
  blackList.value = bot.blackList ?? [];
  headless.value = bot.headless ?? true;

  timestamps.value = $results.model.get(bot.id, []).map((d: SearchBotData) => d.label);

  timestamp.value = timestamps.value[0] ?? '';

  onChangeResult(timestamp.value);
};

const onDeleteResult = async (resultId: string) => {
  const ok = await $results.Delete(props.botId, resultId);
  if (!ok) return;
  const idx = timestamps.value.indexOf(timestamp.value);
  if (idx > -1) timestamps.value.splice(idx, 1);
  timestamp.value = timestamps.value[0] as string;
};

const onChangeResult = (label: string) => {
  searchData.value = $results.model
    .get(props.botId, [])
    .find((d: SearchBotData) => d.label === label);

  const sections = [];
  if (searchData.value?.pages[0]) {
    sections.push('sponsored');
  }
  if (searchData.value?.pages[0]?.serp?.organic) {
    sections.push('organic');
  }

  serpSections.value = sections;
};

watch(props, onChangeBot);
watch(timestamp, onChangeResult);
onMounted(onChangeBot);
</script>

<template>
  <div class="q-px-sm q-gutter-y-sm">
    <div>
      <q-card flat style="background-color: transparent">
        <q-card-section>
          <div class="flex row justify-between items-center">
            <div class="flex row items-center q-gutter-sm">
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
          <div v-if="searchData" class="flex row justify-between">
            <div class="flex row justify-start items-center">
              <div>
                <q-select
                  v-model="timestamp"
                  :options="timestamps"
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
                <ViewImgBtn title="Google SERP" :url="searchData?.pages?.[0]?.img || ''" />
              </div>
              <div>
                <q-toggle
                  v-if="searchData?.pages[0]"
                  v-model="serpSections"
                  checked-icon="mdi-eye-outline"
                  color="primary"
                  label="Sponsored"
                  size="sm"
                  unchecked-icon="mdi-eye-off-outline"
                  val="sponsored"
                />
                <q-toggle
                  v-if="searchData?.pages[0]?.serp?.organic"
                  v-model="serpSections"
                  checked-icon="mdi-eye-outline"
                  color="primary"
                  label="Organic"
                  size="sm"
                  unchecked-icon="mdi-eye-off-outline"
                  val="organic"
                />
                <q-toggle
                  v-if="searchData?.pages[0]?.serp?.people_also_search_for"
                  v-model="serpSections"
                  checked-icon="mdi-eye-outline"
                  color="primary"
                  label="Also Searched"
                  size="sm"
                  unchecked-icon="mdi-eye-off-outline"
                  val="people_also_search_for"
                />
                <q-toggle
                  v-if="searchData?.pages[0]?.serp?.people_also_ask"
                  v-model="serpSections"
                  checked-icon="mdi-eye-outline"
                  color="primary"
                  label="Also Asked"
                  size="sm"
                  unchecked-icon="mdi-eye-off-outline"
                  val="people_also_ask"
                />
              </div>
            </div>

            <div class="flex row justify-start q-gutter-x-sm">
              <TrashBtn @click="onDeleteResult(searchData.id)" outline>
                <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
                  Delete Result
                </q-tooltip>
              </TrashBtn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div v-if="searchData" class="q-mx-sm q-gutter-sm">
      <div class="flex row">
        <SerpTable
          v-if="serpSections.indexOf('people_also_search_for') > -1"
          name="Also Searched"
          :loading="$results.busy"
          :results="searchData?.pages[0]?.serp?.people_also_search_for as SerpResult[]"
        />
        <SerpTable
          v-if="serpSections.indexOf('people_also_ask') > -1"
          class="q-ml-sm"
          name="Also Asked"
          :loading="$results.busy"
          :results="searchData?.pages[0]?.serp?.people_also_ask as SerpResult[]"
        />
      </div>
      <SearchTable
        v-if="serpSections.indexOf('sponsored') > -1"
        :loading="$results.busy"
        :pages="searchData?.pages as PageData[]"
      />
      <SerpTable
        v-if="serpSections.indexOf('organic') > -1"
        name="Organic"
        :results="searchData?.pages[0]?.serp.organic as SerpResult[]"
        :loading="$results.busy"
      />
    </div>
    <div v-else>
      <div class="column q-gutter-y-xl">
        <div class="col-4">
          <div class="flex items-center justify-center">
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXdzN2ZhZ3FtZWFnaGN1dmc1cWtmZDE4bWJvNmRyY21qMDB0OGZoeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NfzERYyiWcXU4/giphy.gif"
              alt="425"
              style="max-width: 350px"
            />
          </div>
        </div>
        <div class="col">
          <div class="flex items-center justify-center q-mt-md">
            <span class="text-h3 text-weight-medium text-center">
              Sit tight precious;
              <br />
              We're prowling.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
