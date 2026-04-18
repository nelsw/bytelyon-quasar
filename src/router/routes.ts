import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    meta: { requiresAuth: false },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        alias: '/login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    meta: { requiresAuth: true },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        meta: { requiresAuth: true },
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: '/:botType(news|search|sitemap)/:botId?',
        meta: { requiresAuth: true },
        component: () => import('pages/BotPage.vue'),
      },
      {
        path: '/news/results/:botId',
        meta: { requiresAuth: true },
        component: () => import('pages/news/ResultsPage.vue'),
      },
      {
        path: '/search/results/:botId',
        meta: { requiresAuth: true },
        component: () => import('pages/search/ResultsPage.vue'),
      },
      {
        path: '/sitemap/results/:botId',
        meta: { requiresAuth: true },
        component: () => import('pages/sitemap/ResultsPage.vue'),
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
