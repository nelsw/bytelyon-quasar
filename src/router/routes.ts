import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/login',
        redirect: '/',
      },
      {
        path: '/',
        name: 'Home',
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
