import {createRouter, createWebHistory} from 'vue-router';
import Signup from '@/components/Signup.vue';
import Homepage from '@/components/Homepage.vue';
import Store from '@/components/Store.vue';
import Signin from '@/components/Signin.vue';
import viewProduct from '@/components/Productpage/viewProduct.vue';

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
    },
    {
      path: '/Store',
      name: 'Store',
      component: Store
    },
    {
    path: '/signin',
    name: 'Signin',
    component: Signin
    },
    {
      path: '/Store/:productName',
      name: 'viewProduct',
      component: viewProduct
    },
  ]
});

export default router;