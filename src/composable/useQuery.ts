import { useRouter } from 'vue-router';

export function useQuery() {

  const $r = useRouter();

  const query = (s: string): string => {
    if ($r.currentRoute.value.query[s] !== undefined) {
      return $r.currentRoute.value.query[s] as string;
    }
    return '';
  };

  return {
    query,
  };
}
