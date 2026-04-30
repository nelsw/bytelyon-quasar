import type { RouteRecordRaw } from 'vue-router';
import BotPage from 'pages/BotPage.vue';
import NewsPage from 'pages/NewsPage.vue';
import SitemapPage from 'pages/SitemapPage.vue';
import SearchPage from 'pages/SearchPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
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
        component: BotPage,
        props: true,
      },
      {
        path: '/:botType(news)/:botId',
        component: NewsPage,
        props: true,
      },
      {
        path: '/:botType(search)/:botId',
        component: SearchPage,
        props: true,
      },
      {
        path: '/:botType(sitemap)/:botId',
        component: SitemapPage,
        props: true,
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
