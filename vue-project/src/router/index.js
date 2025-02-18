import {createRouter, createWebHistory} from 'vue-router';
import Signup from '@/components/Signup.vue';
import Homepage from '@/components/Homepage.vue';
import Store from '@/components/Store.vue';
import Login from '@/components/Login.vue';
import viewProduct from '@/components/Productpage/viewProduct.vue';
import userProfile from '@/components/userProfile.vue';
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
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
    path: '/login',
    name: 'Login',
    component: Login
    },
    {
      path: '/store/product/:id',
      name: 'viewProduct',
      component: viewProduct
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      component: userProfile
    }
  ]
});

export default router;