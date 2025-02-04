<template>
    <nav class="navbar">
      <div class="navbar-brand">MyStore</div>
      <ul class="navbar-nav">
        <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Store</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Checkout</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Sign In</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Sign Up</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
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