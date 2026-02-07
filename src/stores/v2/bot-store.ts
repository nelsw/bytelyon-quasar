import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { JobType, type Job } from 'src/types/model';
import { ref } from 'vue';
import { BotEnum } from 'src/types/base';

const id = 'bot-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};

const setup = () => {

  const searchModel = ref<Job[]>([]);
  const articleModel = ref<Job[]>([]);
  const sitemapModel = ref<Job[]>([]);

  const loadAll = async () => {
    const p3 = load(JobType.ARTICLE);
    const p1 = load(JobType.SITEMAP);
    const p2 = load(JobType.SEARCH);
    return await Promise.all([p1, p2, p3])
      .then(() => {
        console.debug('✅ All Jobs Loaded');
        return true;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      });
  }

  const load = async (t: JobType): Promise<void> => {
    return await api
      .get<Job[]>(`http://localhost:8080/api/jobs/type/${t}`)
      .then((res: AxiosResponse<Job[]>) => {
        console.debug(`✅ ${t} Jobs Loaded`, t, res.data.length);
        if (t === JobType.SEARCH) {
          searchModel.value = res.data;
        } else if (t === JobType.ARTICLE) {
          articleModel.value = res.data;
        } else if (t === JobType.SITEMAP) {
          sitemapModel.value = res.data;
        } else {
          console.warn("unknown type when loading", t)
        }
      })
      .catch((err: AxiosError) => {
        console.error(err.response?.statusText);
      });
  };

  const getBots = (e: BotEnum): Job[] => {
    switch (e) {
      case BotEnum.Articles:
        return articleModel.value;
      case BotEnum.Searches:
        return searchModel.value;
      case BotEnum.Sitemaps:
        return sitemapModel.value;
      default:
        return [];
    }
  };

  const hasBots = (e: BotEnum): boolean => {
    return getBots(e)?.length > 0;
  };

  return {
    load,
    loadAll,
    getBots,
    hasBots,
    articleModel,
    sitemapModel,
    searchModel,
  };
};

export const useBotStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBotStore, import.meta.hot));
}
