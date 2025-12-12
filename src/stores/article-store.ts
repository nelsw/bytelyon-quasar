import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';

const id = 'article-store';
const setup = () => {
  const loading = ref<boolean>(true);
  const remove = async (news: string, id: string): Promise<boolean> => {
    loading.value = true;
    return await api
      .delete('/articles', { params: { id: id, news: news } })
      .then((res: AxiosResponse) => {
        return res.status < 300;
      })
      .catch((err: AxiosError) => {
        console.error(err);
        return false;
      }).finally(() => loading.value = false);
  };
  return { loading, remove };
};
export const useArticleStore = defineStore(id, setup);
