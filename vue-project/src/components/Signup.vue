<template>
  <h1 id="header">Sign up</h1>
  <div class="register">
      <input type="text" placeholder="Enter Name" />
      <input type="text" placeholder="Enter Email" />
      <input type="password" placeholder="Enter Password" />
      <button>Sign up</button>
  </div>
  </template>
  
  <script>
  export default {
      name: 'Signup'
  }
  </script>
  <style>

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