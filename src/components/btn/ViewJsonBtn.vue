<script setup lang="ts">
import { computed } from 'vue';
import { copyToClipboard } from 'quasar';
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import useNotifier from 'src/composable/useNotifier';

const props = defineProps<{
  title: string;
  content: object | undefined;
}>();

const $notify = useNotifier();
const model = defineModel<boolean>({ default: false });
const disabled = computed(() => !props.content);
const color = computed(() => (disabled.value ? 'grey' : 'teal-6'));
const onCopy = async () => {
  await copyToClipboard(JSON.stringify(props.content))
    .then(() => $notify.ok(null, 'Copied content to clipboard'))
    .catch((err) => $notify.err(err, 'Failed to copy content to clipboard'));
};
</script>

<template>
  <q-btn @click="model = true" :color="color" :disable="disabled" icon="mdi-code-json" dense flat>
    <q-tooltip anchor="bottom middle" self="top end" :offset="[10, 10]"> SERP JSON </q-tooltip>
  </q-btn>
  <ToolbarDialog v-model="model" @copy="onCopy" :title="title" copy>
    <template #content>
      <pre style="font-size: 10px"
        >{{ content }}
      </pre>
    </template>
  </ToolbarDialog>
</template>
