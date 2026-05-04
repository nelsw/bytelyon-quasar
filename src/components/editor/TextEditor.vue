<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';

const $q = useQuasar();
const allToolbarOptions = [
  ['viewsource'],
  [
    {
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']

    }
  ],
  ['unordered', 'ordered'],
  ['bold', 'italic', 'underline'],
  [
    {
      icon: $q.iconSet.editor.formatting,
      fixedLabel: true,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    }
  ],
  ['link', 'hr'],
  ['fullscreen']
];

const props = defineProps<{
  kitchenSink?: boolean | undefined;
  color?: string | undefined;
  empty?: boolean | undefined;
  align?: boolean | undefined;
  order?: boolean | undefined;
  effect?: boolean | undefined;
  format?: boolean | undefined;
  size?: boolean | undefined;
  full?: boolean | undefined;
  placeholder?: string | undefined;
  label?: string | undefined;
}>();

const model = defineModel<string>({ required: true });

const toolbar = computed(() => {
  if (props.kitchenSink) return allToolbarOptions;
  if (props.empty) return [];

  const bar = [];
  if (props.align) {
    bar.push([
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify']
      }
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
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    });
  }
  if (props.size) {
    fmt.push({
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
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
  <div>
    <q-editor
      v-model="model"
      :toolbar="toolbar"
      :placeholder="placeholder ?? 'Text Editor'"
      :toolbar-toggle-color="color ?? 'primary'"
      content-style="background-color: #232323"
      dense
      dark
      square
      flat
    />
    <span v-if="label" class="q-ml-md text-grey-5" style="font-size: 11px">
    {{ label }}
  </span>
  </div>

</template>
