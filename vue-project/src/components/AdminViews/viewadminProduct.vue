<template>
    <AdminNavbar/>
    <div class="product-container">
      
        <div class="product-frame" v-for="product in Products" :key="product.id">
          <h1 class="product-title">{{ product.Description }}</h1>
          <p class="product-description">Size = {{ product.Size }}</p>
          <p class="product-price">Price = {{ product.Price }}</p>
          <img :src="product.Image" alt="Product Image" />
          <button class="add-to-cart-button"  @click="addSupply(product.id)" >add Product</button>
        </div>
    </div>
    <form @submit.prevent="handleSubmit">
    <h1 id="header">New Product</h1>
    <div class="newCategory">
      <input type="text" v-model="formData.Size" placeholder="Size" />
      <input type="text" v-model="formData.Price" placeholder="Price" />

      <button type="submit">Add Product</button>
    </div>
  </form>

  </template>
    
  <script setup>
  import AdminNavbar from '@/components/AdminNavBar.vue';
  import { ref, onMounted } from 'vue';
  import apiClient from '@/config/axios';
  import { RouterLink, useRoute } from 'vue-router';
  import { reactive } from 'vue';
  
  
const formData = reactive({
  Size: '',
  Price: '',
});

const handleSubmit = async () => {
  try {
    const id = $route.params.id;
    const response = await apiClient.post(`/product/createProduct/${id}`, formData);
    console.log(response.data);
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
  const addSupply = async (id) =>  {
      try {
        const response = await apiClient.put(`/product/addOne/${id}`);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };
  
  const $route = useRoute();
  const Products = ref([]);
  
  
  
  onMounted(async () => {
    try {
      const id = $route.params.id;
      console.log(id);
      const response = await apiClient.get(`/product/getProductsInCategory/${id}`);
      console.log(response.data.data);
      for(let i = 0; i < response.data.data.length; i++) {
        let product = {
        id: response.data.data[i].idProduct,
        Description: response.data.data[i].Description,
        Image: response.data.data[i].Image,
        Price:  response.data.data[i].Price,
        Size:  response.data.data[i].Size,
      };
      console.log(product);
      Products.value.push(product);
      }
     
   
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  
  });
    </script>
    
    <style scoped>
  
  .product-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    flex-wrap: nowrap; /* Ensure no wrapping */
  }
  
  .product-frame {
    width: 300px; /* Set a fixed width for the boxes */
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
    text-align: center;
    margin-top: 200px;
    margin-bottom: 200px; /* Add margin to create space between boxes */
  }
  
  
  .product-title {
    font-size: 1.5rem;
    margin: 10px 0;
    color: black;
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
    margin-top: 10px;
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