<template>
  <div>
    <CustomerNavbar />
    <div class="store-container">
      <tr v-for="Category in Categories" :key="Category.id">
        <RouterLink :to="{ name: 'viewProduct', params: { id: Category.id }}" class="view_product_button">
          <td class="store-box">
          <td> {{ Category.Description }}</td>
          <td> {{ Category.Image }}</td>
          <td>

            <button class="store-button">View Product</button>
          </td>

          </td>
        </RouterLink>
      </tr>
    </div>
  </div>
</template>

<script setup>
import CustomerNavbar from '@/components/CustomerNavBar.vue';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import apiClient from '@/config/axios'



const Categories = ref([]);

onMounted(async () => {
  try {
    const response = await apiClient.get(`/product/getCategories`);
    console.log(response.data.data.length);
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