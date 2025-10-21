import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: '/login', name: 'login', component: () => import('pages/LoginPage.vue') },
    ],
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashboardPage.vue') },],
    meta: { requiresAuth: true },
  },
  // Always leave this as last one, but we can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
