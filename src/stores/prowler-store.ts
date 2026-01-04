import { ref } from 'vue';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { Loading } from 'quasar';
import { type QTreeNode } from 'quasar';
import type { ProwlerNews, ProwlerSearch, ProwlerSitemap } from 'src/types/prowler';
import { NewsNodes, SearchNodes, SitemapNodes } from 'src/types/prowler';

export interface NodeModel {
  SearchNodes: QTreeNode[];
  SitemapNodes: QTreeNode[];
  NewsNodes: QTreeNode[];
}

const id = 'prowler-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};
const setup = () => {
  const modelSearches = ref<ProwlerSearch[]>([]);
  const modelSitemaps = ref<ProwlerSitemap[]>([]);
  const modelNews = ref<ProwlerNews[]>([]);

  const nodes = ref<NodeModel>({
    SearchNodes: [],
    SitemapNodes: [],
    NewsNodes: [],
  });

  const load = async () => {
    await Promise.all([loadSearches(), loadSitemaps(), loadNews()]);
    nodes.value = {
      SearchNodes: SearchNodes(modelSearches.value),
      SitemapNodes: SitemapNodes(modelSitemaps.value),
      NewsNodes: NewsNodes(modelNews.value),
    };
  };

  const loadNews = async () => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .get('/prowler', { params: { type: 'news' } })
      .then((res: AxiosResponse<ProwlerNews[]>) => (modelNews.value = res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => Loading.hide());
  };

  const loadSitemaps = async () => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .get('/prowler', { params: { type: 'sitemap' } })
      .then((res: AxiosResponse<ProwlerSitemap[]>) => (modelSitemaps.value = res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => Loading.hide());
  };

  const loadSearches = async () => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .get('/prowler', { params: { type: 'search' } })
      .then((res: AxiosResponse<ProwlerSearch[]>) => (modelSearches.value = res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => Loading.hide());
  };

  const Delete = async (id: string) => {
    Loading.show({ spinnerColor: 'primary' });
    return await api
      .delete(`/prowler`, { params: { id: id } })
      .then(load)
      .catch((err: AxiosError) => console.error(err))
      .finally(() => Loading.hide());
  };

  return {
    modelNews,
    modelSitemaps,
    modelSearches,
    nodes,
    load,
    loadNews,
    loadSitemaps,
    loadSearches,
    Delete,
  };
};

export const useProwlerStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProwlerStore, import.meta.hot));
}
