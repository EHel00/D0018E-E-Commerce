<template>
    <div>
        <Navbar />
        <div>
            <h1 id="checkout">Checkout</h1>
            <tbody id="body" v-for="product in products" :key="product.User">
                <tr>
                    <td id="td"> Product:{{ product.chocolate }}</td>
                    <td id="td"> Quantity:{{ product.Quantity }}</td>
                    <td id="td"> Product price:{{ product.Price_single_product }}</td>
                    <td id="td"> Total product price:{{ product.Price_products }}</td>
                    <td id="td"> Product:{{ product.Size }}</td>
                    <td id="td"> Image:{{ product.Image }}</td>

                </tr>
                    <button>-</button>
                    <button>+</button>
                    
            </tbody>
            <div id="Buy">
                        <h2 >Total Price: {{ TotalPrice }}</h2>        
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
let TotalPrice = ref()

const getCart = async () => {
    const response = await apiClient.get(`/product/getCart`);
    console.log(response.data)
    console.log(response.data.total)
    TotalPrice = response.data.total;
    for(let i = 0; i < response.data.data.length; i++ ) {
        console.log(response.data.price[i])
        let product ={
            chocolate: response.data.data[i].Description,
            Quantity: response.data.data[i].Quantity,
            Image: response.data.data[i].Image, 
            Price_single_product: response.data.data[i].Price,
            Price_products: response.data.price[i],
            Size: response.data.data[i].Size
        }
        //console.log(product)
       
        products.value.push(product);
    }
    //products = response.data;
    
}
const handleSubmit = async () => {
    const response = await apiClient.post(`/product/checkOut`);
    console.log(response)
}
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