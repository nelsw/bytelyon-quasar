import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import type { Article } from 'src/types/article';
import type { Sitemap } from 'src/types/sitemap';
import { BotEnum } from 'src/types/base';
import type { Search } from 'src/types/search';

const id = 'job-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};

const setup = () => {
  const articleModel = ref<Article[]>([]);
  const searchModel = ref<Search[]>([]);
  const sitemapModel = ref<Sitemap[]>([]);

  const load = async <T>(e: BotEnum): Promise<void> => {
    await api
      .get<T[]>(`http://localhost:8080/api/${e}`)
      .then((res: AxiosResponse<T[]>) => {
        console.debug(`✅ Sitemaps Loaded`, res.data.length);
        switch (e) {
          case BotEnum.Articles:
            articleModel.value = res.data as Article[];
            return;
          case BotEnum.Searches:
            searchModel.value = res.data as Search[];
            return;
          case BotEnum.Sitemaps:
            sitemapModel.value = res.data as Sitemap[];
            return;
        }
      })
      .catch((err: AxiosError) => {
        console.error(err.response?.statusText);
      });
  };

  return {
    load,
    articleModel,
    searchModel,
    sitemapModel,
  };
};

export const useJobStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
}
