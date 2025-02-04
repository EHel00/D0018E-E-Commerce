import {createRouter, createWebHistory} from 'vue-router';
import Signup from '@/components/Signup.vue';
import Homepage from '@/components/Homepage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

    {
      path: '/',
      name: 'Home',
      component: Homepage
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
});

export default router;