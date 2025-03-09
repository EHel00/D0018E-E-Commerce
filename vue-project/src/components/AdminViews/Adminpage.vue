<template>
  <div>
    <AdminNavbar />
    <div class="store-container">
      <div v-for="Category in Categories" :key="Category.id" class="category-item">
          <div class="store-box">
            <div> {{ Category.Description }}</div>
            <div> <img :src="Category.Image" class="category-image" /> {{ Category.Image }}</div>
        
            <button @click="deleteCategory(Category.id)">Delete</button>
            <div>
              <RouterLink :to="{ name: 'viewadminProduct', params: { id: Category.id }}" class="view_product_button">
              <button class="store-button">View Product</button>
              </RouterLink>
            </div>
          </div>
      </div>
    </div>
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

const Categories = ref([]);

const formData = reactive({
  Description: '',
  Image: '',
});

const handleSubmit = async () => {
  try {
    const response = await apiClient.post('/product/createCategory', formData);
    console.log(response.data);
    window.location.reload();
  } catch (error) {
    console.error('Error adding category:', error);
  }
};
onMounted(async () => {
  try {
    const response = await apiClient.get(`/product/getCategories`);
    console.log(response.data.data);
    for (let i = 0; i < response.data.data.length; i++) {
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

const deleteCategory = async (Categoryid) => {
  if (confirm("are you sure you want to delete this category?")){
    try{
      console.log("delete", Categoryid);
      const Category = {
        id: Categoryid
      }
      const result = await apiClient.post(`/product/deleteCategory`, Category);
      console.log(result);
      window.location.reload();
    }catch(error){
      console.log(error, "Failed to delete category");
    }
  }
};

</script>
  
  <style scoped>
  .store-container {
    display: grid;
  grid-template-columns: repeat(4, 1fr); /* Create a grid with 4 columns */
  gap: 20px;
  padding: 20px;
}

.store-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  cursor: pointer;
  color: black;
}

.category-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.store-button {
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.store-button:hover {
  background-color: #0056b3;
}

.new-category-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.newCategory {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.newCategory input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.newCategory button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.newCategory button:hover {
  background-color: #218838;
}

#header {
  padding-bottom: 20px;
}
  </style>