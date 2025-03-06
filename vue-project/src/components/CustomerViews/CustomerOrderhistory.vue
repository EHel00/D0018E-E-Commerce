<template>
    <div>
      <CustomerNavbar />
      <div class="order-history-container">
        <h1>Order History</h1>
        <table v-if="ordersHistory.length" class="order-history-table">
          <tbody v-for="(orderHistory, index) in ordersHistory" :key="index">
            <thead>
              <tr class="OrderHistoryHeader">
                <th>Date</th>
                <th>Total price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr class="OrderHistoryData">
                <td>{{ orderHistory.Date }}</td>
                <td>{{ orderHistory.TotalPrice }}</td>
                <td>{{ orderHistory.Status }}</td>
              </tr>
              <tr>
                <td colspan="3">
                  <table class="order-details-table">
                    <thead>
                      <tr class="OrderDetailsHeader">
                        <th>Product</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="OrderDetailsData" v-for="order in orders[index]" :key="order.Description">
                        <td>{{ order.Description }}</td>
                        <td>{{ order.Size }}</td>
                        <td>{{ order.Price }}</td>
                        <td>{{ order.Quantity }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
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
  .order-history-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .order-history-table th,
  .order-history-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .order-history-table th {
    background-color:grey;
  }
  
  .order-details-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .order-details-table th,
  .order-details-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .order-details-table th {
 
  }
  
  tr {
    padding: 5px;
  }
  
  .order-history-container {
    margin-top: 100px;
    padding: 30px;
  }
  </style>