<template>
  <div>
    <Navbar />
    <div class="store-container">
      <div class="store-box" v-for="product in products" :key="product.id" @click="goToProduct(product.name)">
        <p>{{ product. }}</p>
        <p>{{ product.size }}</p>
        <p>{{ product.price }}</p>
        <button class="store-button">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Store',
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    const products = ref([]);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/getProducts');  
        console.log(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    onMounted(() => {
      fetchProducts();
      
    });

    const goToProduct = (productName) => {
      router.push({ name: 'viewProduct', params: { productName } });
    };

    return {
      products,
      goToProduct
    };
  }
};
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