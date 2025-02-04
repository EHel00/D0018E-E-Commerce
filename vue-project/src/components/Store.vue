<template>
    <div>
      <Navbar />
      <div class="store-container">
        <div class="store-box">
          <p>Milk Chocolate</p>
          <button class="store-button">Buy Now</button>
        </div>
        <div class="store-box">
          <p>Dark Chocolate</p>
          <button class="store-button">Buy Now</button>
        </div>
        <div class="store-box">
          <p>White Chocolate</p>
          <button class="store-button">Buy Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  export default {
    name: 'Store',
    components: {
      Navbar
    }
  }
  </script>
  
  <style scoped>
.store-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 300px;
  padding: 20px;
  flex-wrap: nowrap; /* Ensure no wrapping */
}

.store-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  
  background-color: #f9f9f9;
}

.store-button {
  margin-top: 220px;
  margin-left: 70px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
}

.store-button:hover {
  background-color: #f9f9f9;
}
p {
  color: black;
}
</style>
