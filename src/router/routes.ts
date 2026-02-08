import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/:bot(search|sitemap|news)/:id(\\d+)?',
        name: 'bot',
        component: () => import('pages/BotPage.vue'),
      },
      {
        path: '/search/:id(\\d+)',
        name: 'search',
        component: () => import('pages/ResultPage.vue'),
      },
      {
        path: '/sitemap/:id(\\d+)/:result(\\d+)',
        name: 'sitemap',
        component: () => import('pages/SitemapPage.vue'),
      },
      {
        path: '/news/:id(\\d+)',
        name: 'news',
        component: () => import('pages/NewsPage.vue'),
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
