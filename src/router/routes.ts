import type { RouteRecordRaw } from 'vue-router';
import TokenPage from 'pages/TokenPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '',
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
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/news',
        children: [
          {
            path: '',
            component: () => import('pages/news/FormPage.vue'),
          },
        ],
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
