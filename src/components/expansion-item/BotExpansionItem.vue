<script setup lang="ts">
import { date } from 'quasar';
import TrashBtn from 'components/btn/TrashBtn.vue';
import { type Bot, type BotType, BotTypeIcon, BotTypeLabel } from 'src/types/model';
import { useBotStore } from 'stores/bot-store';
import { useRouter } from 'vue-router';

defineProps<{
  botType: BotType;
}>();

const $router = useRouter();
const $store = useBotStore();

const onDelete = async (bot: Bot) => {
  if (await $store.remove(bot)) await $router.push(`/${bot.type}`);
};
</script>

<template>
  <q-expansion-item
    @before-show="$store.load(botType)"
    :icon="BotTypeIcon(botType)"
    :label="BotTypeLabel(botType)"
    group="bots"
  >
    <q-list dense>
      <q-separator inset />
      <q-item
        v-for="e in $store.model.get(botType)?.e ?? []"
        :key="e.k"
        :inset-level="0.1"
        :disable="$store.busy"
        class="q-mr-xs"
      >
        <q-item-section>
          <q-item-label>
            {{ e.v.target }}
            <q-tooltip>
              {{ date.formatDate(e.v.workedAt, 'MM/DD/YY hh:mm a') }}
            </q-tooltip>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="q-gutter-xs">
            <TrashBtn
              size="sm"
              :tooltip="`Delete ${BotTypeLabel(e.v.type)} Bot`"
              @click="onDelete(e.v)"
            />
            <q-btn
              :to="`/${e.v.type}/${e.v.id}`"
              color="amber-13"
              icon="mdi-pencil-outline"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Update {{ BotTypeLabel(e.v.type) }} Bot</q-tooltip>
            </q-btn>
            <q-btn
              :to="`/${e.v.type}/results/${e.v.id}`"
              color="white"
              icon="mdi-table"
              size="sm"
              dense
              flat
            >
              <q-tooltip>Show {{ BotTypeLabel(e.v.type) }} Bot Results</q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-inner-loading :showing="$store.busy" dark size="sm" color="primary" />
    </q-list>
  </q-expansion-item>
</template>
