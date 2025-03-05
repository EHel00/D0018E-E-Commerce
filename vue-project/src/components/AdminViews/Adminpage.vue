<template>
<div>
  <AdminNavbar />
  <div class="store-container">
    <div v-for="Category in Categories" :key="Category.id" class="category-item">
      <RouterLink :to="{ name: 'viewadminProduct', params: { id: Category.id }}" class="view_product_button">
        <div class="store-box">
          <div> {{ Category.Description }}</div>
          <div> <img :src="Category.Image"  class="category-image" /> {{ Category.Image }}</div>
          <div>
            <button class="store-button">View Product</button>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>

  <!-- Form to Add a New Category -->
  <form @submit.prevent="handleSubmit">
    <h1 id="header">New Category</h1>
    <div class="newCategory">
      <input type="text" v-model="formData.Description" placeholder="Description" />
      <input type="text" v-model="formData.Image" placeholder="Image URL" />

      <button type="submit">Add Category</button>
    </div>
  </form>
</div>
</template>
  
  <script setup>
  import AdminNavbar from '@/components/AdminNavBar.vue';
  import { ref, onMounted, reactive } from 'vue';
  import { RouterLink } from 'vue-router';
  import apiClient from '@/config/axios'
  import {useRoute}from 'vue-router';
  
  const Categories = ref([]);

  const formData = reactive({
    Description: '',
    Image: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post('/product/createCategory', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  

  
  onMounted(async () => {
      try {
        const response = await apiClient.get(`/product/getCategories`); 
        console.log(response.data.data);
        for(let i = 0; i < response.data.data.length; i++) {
          let Category = {
            id: response.data.data[i].CategoryID,
            Description: response.data.data[i].Description,
            Image: response.data.data[i].Image,
          }
          console.log(Category);
          Categories.value.push(Category);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      });

  
  </script>
  
  <style scoped>
  .store-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    flex-wrap: wrap;
    height: 100%;
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
    color: black;
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