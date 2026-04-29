import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    meta: { requiresAuth: false },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '',
    meta: { requiresAuth: true },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: '/prompt',
        component: () => import('pages/PromptPage.vue'),
      },
      {
        path: '/article',
        component: () => import('pages/ArticlePage.vue'),
      },
      {
        path: '/:botType(news|search|sitemap)/:botId?',
        component: () => import('pages/BotPage.vue'),
      },
      {
        path: '/:botType(news)/:botId/results',
        component: () => import('pages/news/ResultsPage.vue'),
      },
      {
        path: '/:botType(search)/:botId/results',
        component: () => import('pages/SearchPage.vue'),
      },
      {
        path: '/:botType(sitemap)/:botId/results',
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
