import { acceptHMRUpdate, defineStore } from 'pinia';
import { api, type AxiosError, type AxiosResponse } from 'boot/axios';
import { ref } from 'vue';
import { type Job, type JobType } from 'src/types/job';

const id = 'job-store';
const options = {
  persist: {
    debug: true,
    storage: sessionStorage,
  },
};
const setup = () => {
  const loading = ref<boolean>(true);
  const model = ref<Job[]>([]);

  const load = async () => {
    loading.value = true;
    return await api
      .get('/jobs')
      .then((res: AxiosResponse<Job[]>) => (model.value = res.data))
      .catch(handleError)
      .finally(handleFinally);
  };

  const Create = async (data: Job) => {
    loading.value = true;
    return await api
      .post(`/jobs`, data)
      .then((res: AxiosResponse<Job>) => model.value.push(res.data))
      .catch((err: AxiosError) => console.error(err))
      .finally(() => (loading.value = false));
  };

  const find = async (id: string, type: JobType, force?: boolean): Promise<Job | null> => {
    loading.value = true;

    for (const job of model.value) {
      if (job.id === id && job.type === type) {
        loading.value = false;
        return job;
      }
    }

    if (force || model.value.length === 0) {
      await load();
      return find(id, type, false);
    }

    loading.value = false;
    return null;
  };

  const remove = async (id: string) => {
    loading.value = true;
    return await api
      .delete('/jobs', { params: { id: id } })
      .then(() => (model.value = model.value.filter((item) => item.id !== id)))
      .catch(handleError)
      .finally(handleFinally);
  };

  const Save = async (job: Job) => {
    loading.value = true;
    return await api.put(`/jobs`, job).catch(handleError).finally(handleFinally);
  };

  const handleError = (err: AxiosError) => console.error(err);
  const handleFinally = () => (loading.value = false);

  return { loading, model, load, find, remove, Save, Create };
};
export const useJobStore = defineStore(id, setup, options);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
}
