import { api } from 'boot/axios';
import { type Profile } from 'src/types/profile';

const u = '/profiles'

const useProfileApi = () => {
  return {
    get: async () =>
      await api.get<Profile | null>(u).then((r) => r.data ?? []),
  };
};

export default useProfileApi;
