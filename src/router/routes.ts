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
      }
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
        path: '/news',
        meta: { requiresAuth: true },
        component: () => import('pages/news/CreatePage.vue'),
      },
      {
        path: '/news/:id',
        meta: { requiresAuth: true },
        component: () => import('pages/news/UpdatePage.vue'),
      },
      {
        path: '/news/results/:botId',
        meta: { requiresAuth: true },
        component: () => import('pages/news/ResultsPage.vue'),
      },
      {
        path: '/search',
        meta: { requiresAuth: true },
        component: () => import('pages/search/CreatePage.vue'),
      },
      {
        path: '/search/:id',
        meta: { requiresAuth: true },
        component: () => import('pages/search/UpdatePage.vue'),
      },
      {
        path: '/search/results/:botId',
        meta: { requiresAuth: true },
        component: () => import('pages/search/ResultsPage.vue'),
      },
      {
        path: '/sitemap',
        meta: { requiresAuth: true },
        component: () => import('pages/sitemap/CreatePage.vue'),
      },
      {
        path: '/sitemap/:id',
        meta: { requiresAuth: true },
        component: () => import('pages/sitemap/UpdatePage.vue'),
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
