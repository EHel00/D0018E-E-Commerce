<template>
  <navbar/>
    <div class="product-container">
      <div class="product-frame">
       
        <h1 class="product-title"></h1>
        <p class="product-description">This is a detailed description of the product.</p>
        <p class="product-price">$99.99</p>
      </div>
      <button class="add-to-cart-button">Add to Cart</button>
    </div>
  </template>
  
  <script setup>
import Navbar from '../Navbar.vue';
import { ref, onMounted } from 'vue';
import apiClient from '@/config/axios';
import { RouterLink, useRouter } from 'vue-router';

onMounted(async () => {
  try {
    const response = await apiClient.get('http://localhost:3000/api/product/getProduct/');
    console.log(response.data.data);
 
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
  }
  
  .product-frame {
    width: 80%;
    max-width: 600px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    text-align: center;
  }
  
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .product-title {
    font-size: 2rem;
    margin: 20px 0;
  }
  
  .product-description {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  
  .product-price {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px 0;
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