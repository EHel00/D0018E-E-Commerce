<template>
    <div>
        <Navbar />
        <div>
            <tbody v-for="product in products" :key="product.id">
                <h1>Checkout</h1>
            </tbody>
        </div>

    </div>





</template>

<script setup>
import Navbar from './Navbar.vue';
import { onMounted, ref } from 'vue';
import apiClient from '@/config/axios';

const products = ref([])

const getCart = async () => {
    const response = await apiClient.get(`/product/getCart`);
    console.log(response.data.data)
    products = response.data.data
    
}
onMounted(async () => {
    await getCart();
    for(let i = 0; i < products.value.length; i++ ) {
        let product ={
            chocolate: response.data.data[i].product,
            Quantity: response.data.data[i].Quantity
        }
    }

});

</script>


<style>


</style>