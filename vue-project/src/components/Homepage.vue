<template>
     <div>
    <Navbar />
     
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
</div>
  </template>
  
<script setup>

import apiClient from '@/config/axios';
import Navbar from './Navbar.vue';
import { onMounted} from 'vue';

onMounted(async () => {
    const response = await apiClient.get('/user/test');
    console.log(response.data.message);
    }
);

</script>
  <style>
  /* Add your styles here */
  </style>