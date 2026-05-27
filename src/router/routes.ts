import type { RouteRecordRaw } from 'vue-router';
import BotPage from 'pages/BotPage.vue';
import NewsPage from 'pages/NewsPage.vue';
import SitemapPage from 'pages/SitemapPage.vue';
import SearchPage from 'pages/SearchPage.vue';
import ShopifyPage from 'pages/ShopifyPage.vue';

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
        path: '/:botType(news|search|sitemap)/:target?',
        component: BotPage,
        props: true,
      },
      {
        path: '/:botType(news)/:target',
        component: NewsPage,
        props: true,
      },
      {
        path: '/:botType(search)/:target',
        component: SearchPage,
        props: true,
      },
      {
        path: '/:botType(sitemap)/:target',
        component: SitemapPage,
        props: true,
      },
      {
        path: '/shopify',
        component: ShopifyPage,
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
