import { api } from 'boot/axios';
import { type ULID } from 'ulid';
import { type Serp } from 'src/types/serp';

const u = '/searches'

const useSearchApi = () => {
  return {
    getIds: async (query: string) =>
      await api.get<ULID[] | null>(u, { params: { query } }).then((r) => r.data ?? []),
    getSerp: async (query: string, id: ULID) =>
      await api.get<Serp | null>(u, { params: { query, id } }).then((r) => r.data ?? []),
    deleteSerp: async (query: string, id: ULID) =>
      await api.delete(u, { params: { query, id } }).then((r) => r.status === 204),
  };
};

export default useSearchApi;
