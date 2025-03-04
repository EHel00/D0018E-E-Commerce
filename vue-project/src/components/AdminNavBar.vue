<template>
  <nav class="navbar">
    <div class="navbar-brand">MyStore</div>
    <ul class="navbar-nav">
      <div class="nav-links">
        <RouterLink :to="{name: 'Home'}" class="nav-link">Home</RouterLink>
        <RouterLink :to="{name: 'admin'}" class="nav-link">Store</RouterLink>
          <Logout />
          <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
        </div>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Logout from './Logout.vue';

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

.nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>