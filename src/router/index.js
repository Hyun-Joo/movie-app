import { createRouter, createWebHistory } from 'vue-router';
import MainList from '@/views/MainList';

const routes = [
   {
      path: '/',
      name: 'MainList',
      component: MainList
   },
   {
     path: '/movies',
     name: 'MovieList',
     component: import(/* webpackChunkName: "movies" */ '@/views/MovieList')
   },
   {
      path: '/detail',
      name: 'MovieDetail',
      component: import(/* webpackChunkName: "detail" */ '@/views/MovieDetail')
   }
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
});

export default router;
