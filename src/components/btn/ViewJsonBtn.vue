<script setup lang="ts">
import MaxDialog from 'components/dialog/MaxDialog.vue';
import { computed, ref } from 'vue';
import XTooltip from 'components/tooltip/XTooltip.vue';

const props = defineProps<{
  title?: string;
  content?: object;
}>();

const model = defineModel<boolean>({ default: false });
const copied = ref<boolean>(false);
const disabled = computed(() => !props.content);
const color = computed(() => disabled.value ? 'grey' : 'yellow-5');
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
  <q-btn dense flat no-caps size="sm" @click="model = true" :disable="disabled">
    <q-icon name="mdi-code-json" :color="color" size="xs" />
<!--    <x-tooltip text="View<br><code>json</code>" :disabled="disabled" />-->
  </q-btn>
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
