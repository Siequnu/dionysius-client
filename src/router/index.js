import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ShowPage from '@/views/ShowPage.vue';
import ShowsGrid from '@/components/ShowsGrid.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/all',
      name: 'all',
      component: ShowsGrid,
    },
    {
      path: '/show',
      name: 'show',
      component: ShowPage,
    },
  ],
});

export default router;
