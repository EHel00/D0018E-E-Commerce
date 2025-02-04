<template>
    <div>
      <Navbar />
      <h1 id="header">Sign up</h1>
      <div class="register">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Phonenumber" />
        <input type="text" placeholder="Address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button>Sign Up</button>
      </div>
    </div>
  </template>
  
  <script>
 import Navbar from './Navbar.vue';
 import router from '@/router';
  export default {
    name: 'Signup',
    components: {
    Navbar
  }
  }

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