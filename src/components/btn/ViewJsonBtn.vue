<script setup lang="ts">
import MaxDialog from 'components/dialog/MaxDialog.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  title?: string;
  content?: object;
}>();

const model = defineModel<boolean>({ default: false });
const copied = ref<boolean>(false);
const disabled = computed(() => !props.content);
const color = computed(() => disabled.value ? 'grey' : 'teal-14');
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
    <q-tooltip v-if="!disabled" class="bg">View <code>.json</code></q-tooltip>
  </q-btn>
  <MaxDialog v-model="model">
    <template v-slot:title>
      <q-btn icon="mdi-content-copy" @click="copyText" dense flat>
        <q-tooltip class="bg">Copy <code>.json</code> to clipboard</q-tooltip>
      </q-btn>
      <div class="text-h5">
        {{ title }}
      </div>
    </template>
    <template v-slot:content>
      <pre style="font-size: 10px"
        >{{ content }}
      </pre>
    </template>
  </MaxDialog>
</template>
