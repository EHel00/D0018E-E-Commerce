<template>
    <div>
        <CustomerNavbar />
        <div>
            <h1 id="checkout">Checkout</h1>
            <tbody id="body" v-for="product in products" :key="product.Product_id">
                <tr>
                    <td id="td"> Product:{{ product.chocolate }}</td>
                    <td id="td"> Quantity:{{ product.Quantity }}</td>
                    <td id="td"> Product price:{{ product.Price_single_product }}</td>
                    <td id="td"> Total product price:{{ product.Price_products }}</td>
                    <td id="td"> Size:{{ product.Size }}</td>
                    <td id="td"> Image:{{ product.Image }}</td>
                    <button @click="removeProduct(product.Product_id)">Remove product</button>
                </tr>

            </tbody>
            <div id="Buy">
                <h2>Total Price: {{ TotalPrice }}</h2>
                <button @click="handleSubmit()">Checkout</button>
            </div>


        </div>

    </div>





</template>

<script setup>
import CustomerNavbar from '@/components/CustomerNavBar.vue';
import { onMounted, ref, watch } from 'vue';
import apiClient from '@/config/axios';
import router from '@/router';

const products = ref([]);
let TotalPrice = ref();




const removeProduct = async (product) => {
    console.log(product)
    try {
        const send = {
            Product: product,
        }
        const response = await apiClient.put(`/product/removeFromCart`, send);
        console.log(response)
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

const getCart = async () => {
    const response = await apiClient.get(`/product/getCart`);
    console.log(response.data)
    console.log(response.data.total)
    TotalPrice = response.data.total;
    for (let i = 0; i < response.data.data.length; i++) {
        console.log(response.data.price[i])
        let product = {
            chocolate: response.data.data[i].Description,
            Quantity: response.data.data[i].Quantity,
            Image: response.data.data[i].Image,
            Price_single_product: response.data.data[i].Price,
            Price_products: response.data.price[i],
            Size: response.data.data[i].Size,
            Product_id: response.data.data[i].Product
        }
        //console.log(product)
        products.value.push(product);
    }
    //products = response.data;
}
const handleSubmit = async () => {
    try {
        const response = await apiClient.post(`/product/checkOut`);
        console.log(response.response.data);
        router.push({
            name: 'HomeCustomer'
        });
    } catch (error) {
        console.log(products._value);
        for (let i = 0; i < products._value.length; i++) {
            if (products._value[i].Product_id == error.response.data.message) {
                console.log(products._value[i].Description);
                alert(`${products._value[i].chocolate}` + " " + `${products._value[i].Size}` + "g is out of stock");
            }
        }
    }
};
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