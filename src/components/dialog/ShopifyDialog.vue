<script setup lang="ts">
import ToolbarDialog from 'components/dialog/ToolbarDialog.vue';
import BlogPostCard from 'components/card/BlogPostCard.vue';
import { type Post } from 'src/types/model';

const show = defineModel<boolean>('show', { required: true });
const post = defineModel<Post>('post', { required: true });
</script>

<template>
  <ToolbarDialog v-model="show" title="Shopify Blog Post">
    <BlogPostCard v-model="post" color="green-13" />
  </ToolbarDialog>
</template>
