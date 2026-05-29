import { api } from 'src/boot/axios';
import { type Article } from 'src/types/article';
import { type Headline } from 'src/types/headline';

const useNewsApi = () => {
  return {
    deleteHeadline: async (topic: string, url: string) =>
      await api.delete(`/news?topic=${topic}&url=${url}`).then(() => true),
    getHeadlines: async (topic: string) =>
      await api.get<Headline[]>(`/news?topic=${topic}`).then((r) => r.data ?? []),
    getArticle: async (topic: string, url: string) =>
      await api.get<Article>(`/news?topic=${topic}&url=${url}`).then((r) => r.data),
  };
};

export default useNewsApi;
