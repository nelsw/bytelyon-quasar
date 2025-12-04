import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/LoginPage.vue') },
      { path: '/login', name: 'login', component: () => import('pages/LoginPage.vue') },
    ],
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'Dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: '/profile', name: 'Profile', component: () => import('pages/ProfilePage.vue') },
      { path: '/sitemaps', name: 'Sitemaps', component: () => import('pages/SitemapsPage.vue') },
      { path: '/news', name: 'News', component: () => import('pages/NewsPage.vue') },
      { path: '/search', name: 'Search', component: () => import('pages/SearchPage.vue') },
    ],
    meta: { requiresAuth: true },
  },
  // Always leave this as last one, but we can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
