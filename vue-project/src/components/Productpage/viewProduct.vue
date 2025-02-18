<template>
  <navbar/>
    <div class="product-container">
      <div class="product-frame">
       
        <h1 class="product-title"></h1>
        <p class="product-description">Size = {{productDetails.Size}}</p>
        <p class="product-price">Price = {{ productDetails.Price }}</p>
      </div>
      <button class="add-to-cart-button">Add to Cart</button>
    </div>
  </template>
  
  <script setup>
import Navbar from '../Navbar.vue';
import { ref, onMounted } from 'vue';
import apiClient from '@/config/axios';
import { RouterLink, useRoute } from 'vue-router';
import { reactive } from 'vue';


const productDetails = reactive({
  Price: '',
  Size: '',
});
//const product = ref({});
const $route = useRoute();
onMounted(async () => {
  try {
    const id = $route.params.id;
    console.log(id);
    const response = await apiClient.get(`/product/getProduct/${id}`);
    console.log(response.data.data);
    // Description = response.data.data.Description;
    // Image = response.data.data.Image;

    productDetails.Price = response.data.data.Price;
    productDetails.Size = response.data.data.Size;

 
  } catch (error) {
    console.error('Error fetching product:', error);
  }

});
  </script>
  
  <style scoped>
  .product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh; /* Center the box vertically */
}

.product-frame {
  width: 90%;
  max-width: 1000px; /* Make the box even larger */
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 50px; /* Increase padding for a larger box */
  background-color: #f9f9f9;
  text-align: center;
}

.product-title {
  font-size: 2rem;
  margin: 20px 0;
}

.product-description {
  font-size: 1.2rem;
  margin: 10px 0;
  color: black; /* Make the text black */
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
  color: black; /* Make the text black */
}

.add-to-cart-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.add-to-cart-button:hover {
  background-color: #218838;
}
  </style>