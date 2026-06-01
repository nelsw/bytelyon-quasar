import { api } from 'src/boot/axios';
import { type Article } from 'src/types/article';
import { type Headline } from 'src/types/headline';

const u = '/news'

const useNewsApi = () => {
  return {
    deleteHeadline: async (topic: string, url: string) =>
      await api.delete(u, { params: { topic, url } }).then((r) => r.status === 204),
    getHeadlines: async (topic: string) =>
      await api.get<Headline[] | null>(u, { params: { topic } }).then((r) => r.data ?? []),
    getArticle: async (topic: string, url: string) =>
      await api.get<Article>(u, { params: { topic, url } }).then((r) => r.data),
  };
};

export default useNewsApi;
