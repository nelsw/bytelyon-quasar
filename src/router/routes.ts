import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'index',
    meta: { requiresAuth: false },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/LoginPage.vue') },
      // { path: '/login', name: 'login', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('pages/IndexPage.vue'),

  },
  // Always leave this as last one, but we can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
