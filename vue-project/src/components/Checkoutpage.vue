<template>
    <div>
        <Navbar />
        <div>
            <h1 id="checkout">Checkout</h1>
            <tbody id="body" v-for="product in products" :key="product.User">
                <tr>
                    <td id="td"> Product:{{ product.chocolate }}</td>
                    <td id="td"> Quantity:{{ product.Quantity }}</td>

                </tr>
                    <button>-</button>
                    <button>+</button>
            </tbody>
            <div id="Buy">        
                <button @click ="handleSubmit()" >Checkout</button>
            </div>

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
    for(let i = 0; i < response.data.data.length; i++ ) {
        let product ={
            id: response.data.data[i].User,
            chocolate: response.data.data[i].Product,
            Quantity: response.data.data[i].Quantity
        }
        console.log(product)
        products.value.push(product);
    }
    //products = response.data;
    
}
//const handleSubmit = async ()
onMounted(async () => {
    await getCart();
    

});

</script>


<style>
#checkout{
    font-Size: 50px
    
}
#td {
    padding: 1rem;
    font-size: 30px;


}
#buy{
    
    margin-left: 200px;
}

</style>