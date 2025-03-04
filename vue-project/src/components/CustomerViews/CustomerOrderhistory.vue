<template>
    <div>
        <CustomerNavbar />
        <div>
            <h1>Order History</h1>
            <tbody v-for = "order in orders" :key = "order.orderid">
            

            </tbody>
        </div>
    </div>
</template>

<script setup>
import CustomerNavbar from '@/components/CustomerNavBar.vue';
import { ref, onMounted} from 'vue';
import apiClient from '@/config/axios';
onMounted(async () => {
    try {
        const response = await apiClient.get('/user/getOrderHistoryCustomer');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching order history:', error);
    }
});
</script>