<script setup lang="ts">
import NewsBotExpansionItem from 'components/expansion-item/NewsBotExpansionItem.vue';
import SearchBotExpansionItem from 'components/expansion-item/SearchBotExpansionItem.vue';
import SitemapBotExpansionItem from 'components/expansion-item/SitemapBotExpansionItem.vue';
</script>

<template>
  <q-list separator>
    <NewsBotExpansionItem />
    <SearchBotExpansionItem />
    <SitemapBotExpansionItem />
    <q-separator />
  </q-list>
</template>

<style scoped lang="scss"></style>
