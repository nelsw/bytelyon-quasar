import { type RouteLocationRaw, useRoute, useRouter } from 'vue-router';
import { Bot, type BotEnum } from 'src/types/base';
import { type BotType } from 'src/types/model';

const zeroOrNum = (s: string): number => {
  const n = parseInt(s);
  return isNaN(n) ? 0 : n;
};



export function useRouteX() {

  const $route = useRoute();
  const $router = useRouter();


  const isIndex = (): boolean => $router.currentRoute.value.path === '/';
  const isNotIndex = (): boolean => !isIndex();

  const botParam = (): string => $route.params.bot as string;
  const jobParam = (): number => zeroOrNum($route.params.job as string);
  const resultParam = (): number => zeroOrNum($route.params.result as string);

  const bot = (): Bot => Bot($route.params.bot as BotEnum);

  const botType = (): BotType => botParam() as BotType;
  const id = (): number => zeroOrNum($route.params.id as string);
  const to = async (r: RouteLocationRaw) => await $router.push(r);

  const toPath = async (s?: string | BotType) => {
    if (s === undefined) return;
    await to({ path: s });
  };

  const toName = async (s: string) => {
    await to({ name: s });
  };

  return {
    isIndex,
    isNotIndex,
    botParam,
    jobParam,
    resultParam,
    botType,
    bot,
    to,
    toPath,
    toName,
    id,
  };
}
