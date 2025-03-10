<template>
    <button id="logout" @click="logout">Logout</button>
</template>

<script setup>
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();

const logout = async () => {
    try{
        const response = await axios.post('http://13.60.182.242:3000/api/user/logout', {}, {withCredentials: true});
        console.log(response);
        localStorage.removeItem('accessToken');
        router.push({name: 'Login'});
        
    }catch(error){
        console.log(error, 'someshit is wrong with logout')
    }
}


</script>