import { useRoute, useRouter } from 'vue-router';

const zeroOrNum = (s:string): number => {
  const n = parseInt(s);
  return isNaN(n) ? 0 : n;
}

export function useRouteHelper() {

  const route = useRoute();
  const router = useRouter();

  const isIndex = (): boolean => router.currentRoute.value.path === '/';
  const isNotIndex = (): boolean => !isIndex();

  const botParam = (): string => route.params.bot as string;
  const jobParam = (): number => zeroOrNum(route.params.job as string)
  const resultParam = (): number => zeroOrNum(route.params.result as string);

  return {
    isIndex,
    isNotIndex,
    botParam,
    jobParam,
    resultParam,
  };
}
