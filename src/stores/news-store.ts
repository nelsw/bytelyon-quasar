import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { type Job, type JobProps } from 'src/types/job';

export const useNewsStore = defineStore('news', () => {
  const loading = ref<boolean>(true);
  const items = ref<Array<JobProps>>([]);

  const fetch = async () => {
    loading.value = true;
    return await api
      .get('/jobs')
      .then((res: AxiosResponse<Array<JobProps>>) => items.value = res.data)
      .catch(handleError)
      .finally(handleFinally);
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
      .post('/jobs', data)
      .then(async (res: AxiosResponse<JobProps>) => {
        if (job.id === '') {
          await fetch();
          return;
        }
        items.value = items.value.map((item) => {
          if (item.id === job.id) {
            item = res.data;
          }
          return item;
        });
      })
      .catch(handleError)
      .finally(handleFinally);
  };

  const remove = async (id: string) => {
    loading.value = true;
    return await api
      .delete('/jobs', { params: { id: id } })
      .then(() => (items.value = items.value.filter((item) => item.id !== id)))
      .catch(handleError)
      .finally(handleFinally);
  };

  const handleError = (err: AxiosError) => console.error(err)
  const handleFinally = () => loading.value = false;

  return { loading, items, fetch, save, voidSave, remove };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewsStore, import.meta.hot));
}
