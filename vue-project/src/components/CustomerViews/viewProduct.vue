<template>
  <CustomerNavbar/>
  <div>
    <div class="product-container">
        <div class="product-frame" v-for="product in Products" :key="product.id">
          <h1 class="product-title">{{ product.Description }}</h1>
          <p class="product-description">Size = {{ product.Size }}</p>
          <p class="product-price">Price = {{ product.Price }}</p>
          <p class="product-quantity">In Stock= {{ product.Quantity }}</p>
          <img :src="product.Image" alt="Product Image" />
          <button @click="handleSubmit(product)" >Add to Cart</button>
        </div>  
    </div>
    <div class="comment-container">
      <div class="write-comment">
        <textarea v-model="commentData.Comment" placeholder="Write a comment" style ="height:150px; width: 300px"></textarea>
        <input v-model="commentData.Grade" type="number" placeholder="Grade: 0-5" style="height:50px; width: 90px;" />
        <button @click="commentSubmit(commentData)" style="height:50px; width:60px">Submit</button>

      </div>
    
      <div class="comments">
        <h1>Comments</h1>
        <ul v-for = "comment in comments" :key="comment.User">
          <div class="comment">
          <li>User: {{comment.User}}</li>
          <li> {{comment.Grade}}/5</li>
          <li> {{comment.Comment}}</li>
        </div>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import CustomerNavbar from '@/components/CustomerNavBar.vue';
import { ref, onMounted} from 'vue';
import apiClient from '@/config/axios';
import { RouterLink, useRoute } from 'vue-router';
import { reactive } from 'vue';


const comments = ref([]);

const commentData = reactive({
  Comment: '',
  Grade: '',
});
const commentSubmit = async (commentData) => {
  //const Category = $route.params.id;
  let id = $route.params.id;
  console.log($route.params.id);
  const send ={
    Comment: commentData.Comment,
    Grade: commentData.Grade,

  }
  if(send.Grade < 0 || send.Grade > 5 ) {
    alert("Grade must be between 0 and 5");
    return;
  } else if(send.Comment.length < 1) {
    alert("Please write a comment");
    return;
  }
  try {
    const response = await apiClient.post(`/product/addReview/${id}`, send);
    console.log(response);
    window.location.reload();
  } catch (error) {
    console.error('Error adding comment:', error)
  }
}
const handleSubmit = async (product) =>  {
    try {
      
      console.log(product.id);
      const cartData = {
        Product: product.id,
        Quantity: '1',
      };
      const cart = await apiClient.post(`/product/addToCart/`, cartData);
      console.log(cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

const $route = useRoute();
const Products = ref([]);

const fetchComments = async () => {
  try {
    const id = $route.params.id;
    console.log(id);
    const response = await apiClient.get(`/product/getReviews/${id}`);
    console.log(response);
    for(let i = 0; i < response.data.data.length; i++) {
      let comment = {
        User: response.data.data[i].User,
        Grade: response.data.data[i].Grade,
        Comment: response.data.data[i].Comment,
      }
      console.log(comment);
      comments.value.push(comment);
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

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
   await fetchComments();
 
  } catch (error) {
    console.error('Error fetching product:', error);
  }

});
  </script>

  <style scoped>
    body {
    width: 100%;
  }
  .textarea {
    width: 100%;
    height:100px;
  }
  ul {
  list-style-type: none;
}
  .write-comment {
    display: flex;
    gap: 20px;
    display: flex;
  }
.comment{
  border: 1px solid #ccc;
  width: 300px;
  height:relative;
}
.comments {
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  width: 300px;
  gap:20px;

}
.comment-container {
  display:flex;
  justify-content: left;
  align-items: left;
}
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
  margin-top: 150px;
  margin-bottom: 120px; /* Add margin to create space between boxes */
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

.add-to-cart-button:hover {
  background-color: #218838;
}
  </style>