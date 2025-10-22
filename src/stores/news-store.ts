import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { type PageProps } from 'src/models/page';
import type { JobItemsProps } from 'src/models/data';
import { type Job, type JobProps } from 'src/models/job';

export const useNewsStore = defineStore('news-store', () => {
  const loading = ref<boolean>(true);
  const items = ref<Array<JobItemsProps>>([]);

  const fetch = async () => {
    loading.value = true;
    return await api
      .get(process.env.API_JOB)
      .then((res: AxiosResponse<PageProps<JobItemsProps>>) => (items.value = res.data.items))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  const voidSave = (job: Job): void => void save(job);

  const save = async (job: Job) => {
    const data = {
      id: job.id === '' ? null : job.id,
      name: job.name,
      description: job.description,
      type: 1,
      urls: job.urls,
      worked_at: job.id === '' ? null : job.worked_at,
      worked_ok: job.worked_ok,
      keywords: job.keywords,
      frequency: job.frequency,
    };

    loading.value = true;
    return await api
      .post(process.env.API_JOB, data)
      .then(async (res: AxiosResponse<JobProps>) => {
        if (job.id === '') {
          await fetch();
          return;
        }
        items.value = items.value.map((item) => {
          if (item.job.id === job.id) {
            item.job = res.data;
          }
          return item;
        });
      })
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  const remove = async (id: string) => {
    loading.value = true;
    return await api
      .delete(process.env.API_JOB, { params: { id: id } })
      .then(() => (items.value = items.value.filter((item) => item.job.id !== id)))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  return { loading, items, fetch, save, voidSave, remove };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsStore, import.meta.hot));
}
