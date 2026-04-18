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
        path: '/dashboard',
        meta: { requiresAuth: true },
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: '/dashboard/:botType(news|search|sitemap)/:botId?',
        meta: { requiresAuth: true },
        component: () => import('pages/BotPage.vue'),
      },
      {
        path: '/dashboard/:botType(news)/:botId/results',
        meta: { requiresAuth: true },
        component: () => import('pages/news/ResultsPage.vue'),
      },
      {
        path: '/dashboard/:botType(search)/:botId/results',
        meta: { requiresAuth: true },
        component: () => import('pages/search/ResultsPage.vue'),
      },
      {
        path: '/dashboard/:botType(sitemap)/:botId/results',
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
