import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'index',
    meta: { requiresAuth: false },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '', name: 'login', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/tkn/:type/:id',
    name: 'token',
    meta: { requiresAuth: false },
    props: true,
    component: () => import('pages/TokenPage.vue'),
  },
  // Always leave this as last one, but we can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
