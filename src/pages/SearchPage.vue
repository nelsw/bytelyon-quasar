<script setup lang="ts">
import TrashBtn from 'components/btn/TrashBtn.vue';
import { useBotStore } from 'src/stores/bots';
import { computed, onMounted, ref, watch } from 'vue';
import FrequencySelect from 'components/select/FrequencySelect.vue';
import BlackListSelect from 'components/select/BlackListSelect.vue';
import BrowserSelect from 'components/select/BrowserSelect.vue';
import ViewImgBtn from 'components/btn/ViewImgBtn.vue';
import useSearchApi from 'src/composable/api/useSearchApi';
import { type Serp } from 'src/types/serp';
import { ts } from 'src/types/id';
import { screenshot } from 'src/types/screenshot';
import SerpTable from 'components/table/SerpTable.vue';
import { type Bot, type BotType, New } from 'src/types/bot';
import { useRouter } from 'vue-router';
import TargetInput from 'components/input/TargetInput.vue';
import { useMeta } from 'quasar';

interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  botType: BotType;
  target: string;
}>();

const $bots = useBotStore();
const $searches = useSearchApi();
const $router = useRouter();

const bot = ref<Bot>(New(props.botType, props.target));
const serp = ref<Serp>([]);
const options = ref<Option[]>([]);
const option = ref<Option>();

const onDelete = async () => {
  await $bots.delete(props.botType, props.target);
  await $router.replace({ path: `/${props.botType}` });
};

const onChangeBot = async () => {
  bot.value = $bots.get(props.botType, props.target);
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

watch(props, onChangeBot);
watch(option, async (opt) => {
  if (!opt) return;
  serp.value = await $searches.getSerp(props.target, opt.value);
});
onMounted(onChangeBot);
useMeta(() => ({ title: `Search | ${props.target}` }));
</script>

<template>
  <div class="q-pa-sm q-gutter-y-sm">
    <div>
      <q-card flat style="background-color: transparent">
        <q-card-section>
          <div class="flex row items-center q-gutter-sm">
            <TargetInput class="col-3" v-model="bot.target" :hint="undefined" />
            <BrowserSelect v-model="bot.headless" @update:model-value="$bots.update(bot)" />
            <FrequencySelect v-model="bot.frequency" @update:model-value="$bots.update(bot)" />
            <BlackListSelect v-model="bot.blacklist" @update:model-value="$bots.update(bot)" />
            <q-space />
            <TrashBtn @delete="onDelete" size="md">
              <q-tooltip anchor="center start" self="center end" :offset="[10, 10]">
                Delete Bot
              </q-tooltip>
            </TrashBtn>
          </div>
          <q-separator spaced />
          <div class="flex row justify-between items-center">
            <q-select
              v-model="option"
              :options="options"
              hide-dropdown-icon
              dense
              hide-hint
              hide-bottom-space
              filled
              options-dense
            >
              <template #prepend>
                <q-icon name="mdi-calendar-clock-outline" color="primary" />
              </template>
            </q-select>

            <div class="flex row justify-start q-gutter-x-sm">
              <ViewImgBtn title="Google SERP" :url="screenshot(url, option?.value)" />
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
      <SerpTable v-model="serp" :id="option?.value" />
    </div>
  </div>
</template>
