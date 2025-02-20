<template>
    <div>
      <Navbar />
      <h1 id="header">Login</h1>
      <form @submit.prevent="handleSubmit">

        <input type="text" placeholder="Email" v-model="formData.Email" />
        <input type="password" placeholder="Password" v-model="formData.password" />

        <button>Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
 import Navbar from './Navbar.vue';
import {reactive} from 'vue';
import axios from 'axios';
//import { jwtDecode} from 'jwt-decode';

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
    const response = await axios.post('/user/login', formCredentials, {withCredentials: true});

    localStorage.setItem('token', response.data.token);
    console.log(response.data);
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

  </script>
  <style>
#header {
    padding-bottom: 20px;
}
  .register input{
      width: 320px;
      height: 40px;
      padding-left: 20px;
      display: block;
      margin-bottom: 30px;
      margin-right: auto;
      margin-left:auto;
      border: 1px solid;
  }
  .register button {
      width: 320px;
      height: 40px;
      border: 1px solid;
      background: green;
      color:black;
      cursor:pointer;
  }

  </style>