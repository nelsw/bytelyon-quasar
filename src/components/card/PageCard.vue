<script setup lang="ts">
import SafeImg from 'components/img/SafeImg.vue';
import { screenshot } from 'src/types/screenshot';
import { ts } from 'src/types/id';
import { type Snippet } from 'src/types/snippet';

defineProps<Snippet>();
</script>

<template>
  <q-card flat bordered>
    <q-card-section horizontal>
      <q-card-section>
        <div class="text-caption">{{ ts(id) }}</div>
        <div class="text-subtitle1">{{ title }}</div>
        <div class="text-subtitle2">
          {{
            meta['twitter:description'] ??
            meta['og:description'] ??
            meta['description'] ?? ''
          }}
        </div>
      </q-card-section>
      <SafeImg :src="screenshot(url, id)" :ratio="10 / 4" class="col-3" open />
    </q-card-section>
  </q-card>
</template>
