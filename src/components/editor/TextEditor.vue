<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const props = defineProps<{
  empty?: boolean | undefined;
  align?: boolean | undefined;
  order?: boolean | undefined;
  effect?: boolean | undefined;
  format?: boolean | undefined;
  size?: string | undefined;
  full?: boolean | undefined;
}>();

const $q = useQuasar();
const model = defineModel<string>({ required: true });
const toolbar = computed(() => {
  if (props.empty) return [];
  const bar = [];
  if (props.align) {
    bar.push([
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify'],
      },
    ]);
  }
  if (props.order) {
    bar.push(['unordered', 'ordered']);
  }
  if (props.effect) {
    bar.push(['bold', 'italic', 'underline']);
  }

  bar.push(['hr', 'link']);

  const fmt = [];
  if (props.format) {
    fmt.push({
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
    });
  }
  if (props.size) {
    fmt.push({
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
    });
  }
  fmt.push('removeFormat');
  bar.push(fmt);
  bar.push(['viewsource']);
  if (props.full) {
    bar.push(['fullscreen']);
  }
  return bar;
});
</script>

<template>
  <q-editor v-model="model" :toolbar="toolbar" min-height="25vh" dense />
</template>
