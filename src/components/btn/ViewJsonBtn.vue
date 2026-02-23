<script setup lang="ts">
import { computed } from 'vue';
import { copyToClipboard } from 'quasar';
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import useNotifier from 'src/composable/useNotifier';

const props = defineProps<{
  title: string;
  content: object | null;
}>();

const $notify = useNotifier();
const model = defineModel<boolean>({ default: false });
const disabled = computed(() => !props.content);
const color = computed(() => (disabled.value ? 'grey' : 'yellow-6'));
const onCopy = async () => {
  await copyToClipboard(JSON.stringify(props.content))
    .then(() => $notify.ok(null, 'Copied content to clipboard'))
    .catch((err) => $notify.err(err, 'Failed to copy content to clipboard'));
};
</script>

<template>
  <q-btn @click="model = true" :disable="disabled" dense flat>
    <q-icon name="mdi-code-json" :color="color" size="xs" />
  </q-btn>
  <ToolbarDialog v-model="model" @copy="onCopy" :title="title" copy>
    <template #content>
      <pre style="font-size: 10px"
        >{{ content }}
      </pre>
    </template>
  </ToolbarDialog>
</template>
