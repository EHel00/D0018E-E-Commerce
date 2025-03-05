<template>
    <div>
        <CustomerNavbar />
        <div>
            <h1>Order History</h1>
            <table v-if="ordersHistory.length">
                
                
                <tbody v-for="(orderHistory, index) in ordersHistory" :key="index">
                <div class="order-history">
                    <tr>
                        <th>Date</th>
                        <th>Total price</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>{{ orderHistory.Date }}</td>
                        <td>{{ orderHistory.TotalPrice }}</td>
                        <td>{{ orderHistory.Status }}</td>
                    </tr>
                    <div class="order-details">
                    <tr>
                        <td >Product</td>
                        <td >Size</td>
                        <td >Price</td>
                        <td >Amount</td>
                    </tr>
                    </div>
                    <tr v-for="order in orders[index]" :key="order.Description">
                        <td>{{ order.Description }}</td>
                        <td>{{ order.Size }}</td>
                        <td>{{ order.Price }}</td>
                        <td>{{ order.Quantity }}</td>
                    </tr>
                </div>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import CustomerNavbar from '@/components/CustomerNavBar.vue';
import { ref, onMounted } from 'vue';
import apiClient from '@/config/axios';

const ordersHistory = ref([]);
const orders = ref([]);

onMounted(async () => {
    try {
        const response = await apiClient.get('/user/getOrderHistoryCustomer');
        console.log(response.data);


        for (let i = 0; i < response.data.OrderHistory.length; i++) {
            let orderHistory = {
                Date: response.data.OrderHistory[i].Date.split('T')[0],
                TotalPrice: response.data.OrderHistory[i].TotalPrice,
                Status: response.data.OrderHistory[i].Status,
            };
            ordersHistory.value.push(orderHistory);
        }


        for (let j = 0; j < response.data.Order.length; j++) {
            let orderArray = [];
            for (let k = 0; k < response.data.Order[j].length; k++) {
                let order = {
                    Description: response.data.Order[j][k].Description,
                    Size: response.data.Order[j][k].Size,
                    Price: response.data.Order[j][k].Price,
                    Quantity: response.data.Order[j][k].Quantity,
                };
                console.log(order);
                orderArray.push(order);
            }
            console.log(orderArray);
            orders.value.push(orderArray);
        }
        
        console.log(ordersHistory.value);
        console.log(orders.value);
    } catch (error) {
        console.error('Error fetching order history:', error);
    }
});
</script>

<style scoped>
.order-history {
    margin: 4px;
    border-style: solid;
    border-color: white;
    border-width: 1px;
    border-radius: 2px;
}
.order-details {
    border-top: 1px solid white;
}
tr{
    padding:5px;
}
</style>