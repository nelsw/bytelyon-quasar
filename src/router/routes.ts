import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
    meta: { requiresAuth: false },
  },
  {
    path: '/dash',
    component: () => import('layouts/DashLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashPage.vue') },],
    meta: { requiresAuth: true },
  },
  {
    path: '/sitemap',
    component: () => import('layouts/DashLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashPage.vue') }],
  },
  {
    path: '/news',
    component: () => import('layouts/DashLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
