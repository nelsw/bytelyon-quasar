<script setup lang="ts">
import { date } from 'quasar';

defineProps<{
  color?: string | undefined;
  hint?: string | undefined;
}>();

const model = defineModel<string>({
  required: false,
  default: date.formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
});
</script>

<template>
  <q-input
    v-model="model"
    input-style="text-align:center;"
    :color="color ?? 'primary'"
    :hint="hint"
    filled
    dense
    square
  >
    <template v-slot:prepend>
      <q-btn :color="color ?? 'primary'" icon="mdi-calendar-month" dense flat>
        <q-tooltip anchor="bottom middle" self="top end" :offset="[10, 10]">
          Date Picker
        </q-tooltip>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            v-model="model"
            mask="YYYY-MM-DD HH:mm"
            today-btn
            :color="color ?? 'primary'"
            text-color="dark"
            square
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" :color="color ?? 'primary'" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>

    <template v-slot:append>
      <q-btn :color="color ?? 'primary'" icon="mdi-clock-outline" dense flat>
        <q-tooltip anchor="bottom middle" self="top end" :offset="[10, 10]">
          Time Picker
        </q-tooltip>
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time
            v-model="model"
            mask="YYYY-MM-DD HH:mm"
            format24h
            now-btn
            :color="color ?? 'primary'"
            text-color="dark"
            square
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" :color="color ?? 'primary'" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<style scoped lang="scss"></style>
