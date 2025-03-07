<template>
    <div>
      <Navbar />
      <h1 id="header">Login</h1>
      <form @submit.prevent="handleSubmit">

        <input class="logininput" type="text" placeholder="Email" v-model="formData.Email" />
        <input class="logininput" type="password" placeholder="Password" v-model="formData.Password" />

        <button class="loginbutton" type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
 import Navbar from './Navbar.vue';
import {reactive} from 'vue';
import axios from 'axios';
import router from '@/router';
import {jwtDecode} from "jwt-decode";
//import apiClient from '@/config/axios';


const formData = reactive({
  Email: '', 
  Password: '',
});

const handleSubmit = async () => {
  const formCredentials = {
    email: formData.Email,
    password: formData.Password,
  };
  try {
    const response = await axios.post('http://localhost:3000/api/user/login', formCredentials, {withCredentials: true});
    //const response = await axios.post('http://localhost:3000/api/user/login', formCredentials, {withCredentials: true});
    console.log(response.data.role);
    localStorage.setItem('accessToken', response.data.accessToken);
    if(response.data.role === 'admin'){
      router.push({ name: 'admin' });
      console.log('admin');
    } else if(response.data.role === 'customer'){
      router.push({ name: 'Store' });
      console.log('customer');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

</script>
<style>
  #header {
    padding-bottom: 20px;
}
  .logininput{
    width: 320px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid;
  }
  .loginbutton {
      width: 320px;
      height: 40px;
      border: 1px solid;
      background: green;
      color:black;
      cursor:pointer;
  }

  </style>