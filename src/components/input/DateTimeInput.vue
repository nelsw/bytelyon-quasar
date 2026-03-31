<script setup lang="ts">
import { date } from 'quasar'

const model = defineModel<string>({
  required: false,
  default: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
})
</script>

<template>
  <div style="max-width: 205px">
    <q-input  v-model="model">
      <template v-slot:prepend>
        <q-icon name="mdi-calendar-month" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="model" mask="YYYY-MM-DD HH:mm" today-btn>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="mdi-clock-outline" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="model" mask="YYYY-MM-DD HH:mm" format24h now-btn>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<style scoped lang="scss">

</style>
