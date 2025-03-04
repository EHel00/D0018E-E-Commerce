<template>
    <div class="container">
        <AdminNavbar />
        
        <div class="content">
            <h1>Order List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Status</th>

                       
                    </tr>
                </thead>
                <tbody v-for = "order in orders" :key="order.orderid">
                    <tr>
                        <td>{{order.orderid}}</td>
                        <td>{{order.user}}</td>
                        <td>{{order.date}}</td>
                        <td>{{order.totalPrice}}</td>
                        <td>{{order.status}}</td>
                        <td>
                            <button @click="showDetails(order.orderid)">More info</button> 
                        </td>
                        <td> <button @click="changeStatus(order)" >Change status</button> </td>
                    </tr>
                    <!-- <tr class ="{hideDetails: !isActive.get(order.orderid)}">


                    </tr> -->
                    

                </tbody>
            </table>
        </div>
    </div>

</template>
<script setup>
import AdminNavbar from '@/components/AdminNavBar.vue';
import { ref, onMounted } from 'vue';
import apiClient from '@/config/axios';

const isActive = ref(new Map());
const orders = ref([]);

const changeStatus = async(order) => {
    let id = {
        idOrderHistory: order.orderid,
    }
    const response = await apiClient.put(`/user/updateOrderStatus`,id);
    console.log(response);
}

const showDetails = function(id) {
    if(isActive.value.get(id)){
        isActive.value.set(id, false);
    } else {
        isActive.value.set(id, true);
    }
}

const fetchOrders = async () => {
    
    console.log(response.data.data);
    orders.value = response.data.data;
}
onMounted (async () => {
    //await fetchOrders();
    const response = await apiClient.get('/user/getOrderHistoryAdmin');
    console.log(response.data.data);
    for (let i = 0; i < response.data.data.length; i++) {
        let order = {
            orderid: response.data.data[i].idOrderHistory,
            user: response.data.data[i].User,
            date: response.data.data[i].Date,
            totalPrice: response.data.data[i].TotalPrice,
            status: response.data.data[i].Status
        }
        console.log(order);
        //isActive.value.set(i, false);
        orders.value.push(order);
    }

});
</script>
<style>

</style>