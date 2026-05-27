import { api } from 'boot/axios';
import { type ULID } from 'ulid';
import { type Serp } from 'src/types/serp';

const useSearchApi = () => {
  return {
    getIds: async (q: string) =>
      await api.get<ULID[]>(`/searches?query=${q}`).then((r) => r.data),
    getSerp: async (q: string, id: ULID) =>
      await api.get<Serp>(`/searches?query=${q}&id=${id}`).then((r) => r.data),
    deleteSerp: async (q: string, id: ULID) =>
      await api.delete(`/searches?query=${q}&id=${id}`),
  };
};

export default useSearchApi;
