import './assets/main.css'
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';
import './config/axios.js';
const app = createApp(App);
app.use(router);
app.mount('#app')