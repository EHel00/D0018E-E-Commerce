<template>
     <div>
    <Navbar />
     
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
</div>
  </template>
  
  <script>
 import Navbar from './Navbar.vue';
 import router from '@/router';
  export default {
    name: 'Home',
    components: {
    Navbar
  }
  }

  </script>
  <style>
  /* Add your styles here */
  </style>