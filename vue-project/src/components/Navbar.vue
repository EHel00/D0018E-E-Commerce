<template>
  <nav class="navbar">
    <div class="navbar-brand">MyStore</div>
    <ul class="navbar-nav">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>

        <div v-if="!loggedIn">
          <RouterLink to="/login" class="nav-link">Login</RouterLink>
          <RouterLink to="/signup" class="nav-link">Sign Up</RouterLink>
        </div>
        <div v-else class="nav-links">
          <RouterLink :to="{name: 'store'}" v-if="Role === 'customer'" class = "nav-link">Store</RouterLink>
          <RouterLink :to="{name: 'admin'}" v-if="Role === 'admin'" class = "nav-link">Admin</RouterLink>
          <Logout />
        </div>
        

        </div>
    </ul>
  </nav>
</template>

<script setup>
import { isAuthenticated } from '@/router';
import { RouterLink } from 'vue-router';
import Logout from './Logout.vue';
import { ref } from 'vue';
import {jwtDecode} from 'jwt-decode';

const loggedIn = isAuthenticated();
const token = localStorage.getItem('accessToken');
const Role = ref('');

if (token) {
  const decodedToken = jwtDecode(token);
  //Role.value = decodedToken.user.role;
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