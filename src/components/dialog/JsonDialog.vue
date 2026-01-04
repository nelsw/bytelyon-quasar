<script setup lang="ts">
import MaxDialog from 'components/dialog/MaxDialog.vue';
import { ref } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';

const props = defineProps<{
  title?: string;
  content?: object;
}>();

const model = defineModel<boolean>({ required: true });
const copied = ref<boolean>(false);
const copyText = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(props.content));
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<template>
  <MaxDialog v-model="model">
    <template v-slot:title>
      <q-btn icon="mdi-content-copy" @click="copyText" dense flat>
        <x-tooltip text="Copy <code>json</code> to clipboard" />
      </q-btn>
      <div class="text-h5" v-html="title" />
    </template>
    <template v-slot:content>
      <pre style="font-size: 10px"
        >{{ content }}
      </pre>
    </template>
  </MaxDialog>
</template>
