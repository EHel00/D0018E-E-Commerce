<template>
    <div>
      <Navbar />
      <h1 id="header">Login</h1>
      <div class="register">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>
      </div>
    </div>
  </template>
  
  <script>
 import Navbar from './Navbar.vue';
 
  export default {
    name: 'Login',
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