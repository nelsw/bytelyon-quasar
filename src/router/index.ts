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
    const $auth = useTokenStore();

    if (to.name !== 'Home' && $auth.IsInvalid()) {
      next({name: 'Home'});
    } else {
      next();
    }

    const tkn = to.query['tkn'];
    if (tkn !== undefined) {
      // call it
      // it should return a login payload with jwt token
    }


    const typ = to.query.typ;
    if (typ !== undefined) {

      if (typ === 'confirm') {
        // just redirect to dash
        // enjoy your new token
        // bye
      }

      if (typ === 'reset') {
        // display persistent dialog and make them submit a new password
      }
    }
  });

  return new Promise((resolve) => resolve(Router));
});
