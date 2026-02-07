import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    meta: { requiresAuth: false },
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        meta: {
          title: 'ByteLyon',
        },
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/:bot(articles|sitemaps|searches)',
        name: 'bot',
        component: () => import('pages/BotPage.vue'),
      },
      {
        path: '/:bot(articles|sitemaps|searches)/:job(\\d+)',
        name: 'job',
        component: () => import('pages/JobPage.vue'),
      },
      {
        path: '/:bot(articles|sitemaps|searches)/:job(\\d+)/:result(\\d+)',
        name: 'result',
        component: () => import('pages/ResultPage.vue'),
      },
    ],
  },
  // Always leave this as last one, but we can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
