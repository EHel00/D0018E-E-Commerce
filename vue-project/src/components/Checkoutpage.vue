<template>
    <div>
        <Navbar />
        <div>
        <h1>Checkout</h1>
        </div>

    </div>





</template>

<script setup>
import Navbar from './Navbar.vue';
import { onMounted } from 'vue';
onMounted(async () => {
    try{
        const response = await apiClient.get(`/product/getCart`);
        console.log(response)
        Product = response.data.data.Product;
        Quantity = response.data.data.Quantity

    }catch{

    }

});

</script>


<style>


</style>