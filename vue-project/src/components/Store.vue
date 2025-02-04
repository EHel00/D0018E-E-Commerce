<template>
    <div>
      <Navbar />
      <div class="store-container">
        <div class="store-box" @click="goToProduct('Milk Chocolate')">
          <p>Milk Chocolate</p>
          <button class="store-button">Buy Now</button>
        </div>
        <div class="store-box" @click="goToProduct('Dark Chocolate')">
          <p>Dark Chocolate</p>
          <button class="store-button">Buy Now</button>
        </div>
        <div class="store-box" @click="goToProduct('White Chocolate')">
          <p>White Chocolate</p>
          <button class="store-button">Buy Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Store',
    components: {
      Navbar
    },
    setup() {
      const router = useRouter();
  
      const goToProduct = (productName) => {
        router.push({ name: 'viewProduct', params: { productName } });
      };
  
      return {
        goToProduct
      };
    }
  }
  </script>
  
  <style scoped>
  .store-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    flex-wrap: nowrap; /* Ensure no wrapping */
  }
  
  .store-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    cursor: pointer;
  }
  
  .store-button {
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  p {
    color: black;
  }
  </style>