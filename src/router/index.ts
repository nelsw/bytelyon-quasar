import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useTokenStore } from 'stores/token-store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(async function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {

    console.log(`Router (Before): ${JSON.stringify({
      from: {
        path: from.path,
        params: from.params,
        query: from.query,
      },
      to: {
        path: to.path,
        params: to.params,
        query: to.query,
      },
    }, null, 2)}`);

    const $auth = useTokenStore();

    if (to.name === 'Login' || $auth.IsValid()) {
      next();
    } else if (to.name === 'Home') {
      next({ name: 'Login' });
    } else {
      next({ name: 'Login', query: { next: to.fullPath} });
    }
  });

  Router.afterEach((g) => {
    console.log(`Router (After): ${JSON.stringify({
      path: g.path,
      params: g.params,
      query: g.query,
    }, null, 2)}`);
  });

  return new Promise((resolve) => resolve(Router));
});
