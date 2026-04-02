import type { RouteRecordRaw } from 'vue-router';
import TokenPage from 'pages/TokenPage.vue';

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
      {
        path: '/tkn/:type/:id',
        name: 'token',
        meta: { requiresAuth: false },
        component: TokenPage,
        props: true,
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
        component: () => import('pages/IndexPage.vue'),
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
