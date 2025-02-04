<template>
    <nav class="navbar">
      <div class="navbar-brand">MyStore</div>
      <ul class="navbar-nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/store" class="nav-link">Store</RouterLink>
        <RouterLink to="/checkout" class="nav-link">Checkout</RouterLink>
        <RouterLink to="/signin" class="nav-link">Sign In</RouterLink>
        <RouterLink to="/signup" class="nav-link">Sign Up</RouterLink>
      </ul>
    </nav>
  </template>
  
  <script>
import { RouterLink, routerViewLocationKey } from 'vue-router';

  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: 2rem;
    background-color: #333;
    color: white;
    z-index: 1000;
  }
  
  .navbar-brand {
    margin-left: 5px;
  }
  
  .navbar-nav {
    list-style: none;
    display: flex;
    gap: 15px;
    margin-right: 10px;
  }
  

  
  .nav-link {
    color: white;
    text-decoration: none;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  </style>