import {createRouter, createWebHistory} from 'vue-router';
import Signup from '@/components/Signup.vue';
import HomepageCustomer from '@/components/CustomerViews/HomepageCustomer.vue';
import Homepage from '@/components/Homepage.vue';
import Store from '@/components/CustomerViews/Store.vue';
import Login from '@/components/Login.vue';
import viewProduct from '@/components/CustomerViews/viewProduct.vue';
import Adminpage from '@/components/AdminViews/Adminpage.vue';
import viewadminProduct from '@/components/AdminViews/viewadminProduct.vue';
import Checkoutpage from '@/components/CustomerViews/Checkoutpage.vue'
import HomepageAdmin from '@/components/AdminViews/HomepageAdmin.vue';
import AdminProfile from '@/components/AdminViews/AdminProfile.vue';
import createAdmin from '@/components/AdminViews/CreateAdminpage.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      //general routes
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    //Customer routes
    {
      path: '/CustomerHomepage',
      name: 'HomeCustomer',
      component: HomepageCustomer
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },

    {
      path: '/store/product/:id',
      name: 'viewProduct',
      component: viewProduct
    },

    { 
      path: '/store/checkout/:id',
      name: 'Checkout',
      component: Checkoutpage
    },
 //Admin routes
    {
      path: '/AdminHomepage',
      name: 'HomepageAdmin',
      component : HomepageAdmin
    },
    {
      path: '/admin',
      name: 'admin',
      component: Adminpage
    },
    {
      path: '/admin/profile',
      name: 'AdminProfile',
      component: AdminProfile
    },
    {
      path: '/admin/product/:id',
      name: 'viewadminProduct',
      component: viewadminProduct
    },
    {
      path: '/admin/profile/createAdmin',
      name: 'createAdmin',
      component: createAdmin
    }
  ]
});

export const isAuthenticated = () => !!localStorage.getItem('accessToken');

export default router;