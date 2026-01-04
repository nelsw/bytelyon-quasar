import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    meta: { requiresAuth: false },
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/LoginPage.vue') },
      { path: '/login', name: 'login', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/dashboard',
    meta: { requiresAuth: true },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // todo - homeish page
        children: [
          {
            path: '/dashboard/search/:id?/:date?',
            name: 'search',
            props: true,
            meta: {
              icon: 'mdi-search-web',
              color: 'indigo-12',
            },
            component: () => import('pages/dashboard/SearchPage.vue'),
          },
          {
            path: '/dashboard/sitemap/:id?/:date?',
            name: 'sitemap',
            props: true,
            meta: {
              icon: 'mdi-sitemap',
              color: 'deep-purple-12',
            },
            component: () => import('pages/dashboard/SitemapPage.vue'),
          },
          {
            path: '/dashboard/news/:id?/:date?',
            name: 'news',
            props: true,
            meta: {
              icon: 'mdi-newspaper',
              color: 'purple-12',
            },
            component: () => import('pages/dashboard/NewsPage.vue'),
          },
          {
            path: '/dashboard/account',
            name: 'account',
            component: () => import('pages/ProfilePage.vue'),
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
