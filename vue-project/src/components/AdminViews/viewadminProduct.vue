<template>
    <AdminNavbar/>
    <body>
    <div class="product-container">
      
        <div class="product-frame" v-for="product in Products" :key="product.id">
         <div class="product-item"> 
            <h1 class="product-title">{{ product.Description }}</h1>
            <p class="product-description">Size = {{ product.Size }}</p>
            <p class="product-price">Price = {{ product.Price }}</p>
            <p class="product-quantity">In Stock= {{ product.Quantity }}</p>
            <img :src="product.Image" alt="Product Image" />
            <div >
            <input type="number" min="0" v-model="SupplyAmount[product.id]" placeholder="Add Quantity" />
            <button class="add-to-cart-button"  @click="addSupply(product.id, product.Quantity)" >add Product</button>
            <button class="delete-from-cart-button"  @click="deleteProduct(product.id)" >Delete</button>
            </div>
          </div>
        </div>
    </div>
    <form @submit.prevent="handleSubmit">
    <h1 id="header">New Product</h1>
    <div class="newCategory">
      <input type="number" min="0" v-model="formData.Size" placeholder="Size" />
      <input type="number" min="0" v-model="formData.Price" placeholder="Price" />

      <button type="submit">Add Product</button>
      
    </div>
  </form>
  </body>
  </template>
    
  <script setup>
  import AdminNavbar from '@/components/AdminNavBar.vue';
  import { ref, onMounted } from 'vue';
  import apiClient from '@/config/axios';
  import { RouterLink, useRoute } from 'vue-router';
  import { reactive } from 'vue';


const deleteProduct= async (id) => {
  if(confirm("are you sure you want to delete this product?")){
    try {
      console.log(id);
      // const response = await apiClient.delete(`/product/deleteProduct/${id}`);
      // console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}

const SupplyAmount = ref({});
  
const formData = reactive({
  Size: '',
  Price: '',
});

// const SupplyAmount = reactive({
//   Supply: '',
// });
const handleSubmit = async () => {
  const submit = {
    Size: formData.Size,
    Price: formData.Price,
  };
  try {
    if (formData.Size === '' || formData.Price === '') {
      alert('Please fill in all fields');
      return;
    }
    if (formData.Size < 0 || formData.Price < 0) {
      alert('Please enter a positive number');
      return;
    }
    const id = $route.params.id;
    console.log(id)
    console.log(submit);
    const response = await apiClient.post(`/product/createProduct/${id}`, submit);
    console.log(response.data);
    window.location.reload();
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

  const addSupply = async (id, CurrentQuantity) =>  {
    const Supplyadd = {
      Quantity: SupplyAmount.value[id]
    }
      try {
        if(Supplyadd.Quantity + CurrentQuantity < 0) {
          alert('Quantity can not be bellow 0');
          return;
        }

        console.log(Supplyadd);
        const response = await apiClient.post(`/product/updateSupply/${id}`, Supplyadd);
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.error('Error adding supply:', error);
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
        Quantity: response.data.data[i].Quantity,
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
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Create a grid with 4 columns */
  gap: 20px;
  padding: 20px;
}

.product-frame {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  text-align: center;
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
.product-quantity {
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
.delete-from-cart-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: red ;
  color: white;
  border: none;
  border-radius: 5px;
}
.add-to-cart-button:hover {
  background-color: #218838;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.newCategory button:hover {
  background-color: #0056b3;
}
    </style>