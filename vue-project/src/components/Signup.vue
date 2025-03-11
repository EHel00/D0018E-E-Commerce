<template>
  <div>
    <Navbar />
    <form @submit.prevent="handleSubmit">
      <h1 id="header">Sign up</h1>
      <div class="register">
        <input type="text" v-model="formData.Email" placeholder="Email" />
        <input type="password" v-model="formData.Password" placeholder="Password" />
        <input type="password" v-model="formData.ConfirmPassword" placeholder="ConfirmPassword" />
        <input type="text" v-model="formData.PhoneNumber" placeholder="PhoneNumber" />
        <input type="text" v-model="formData.FirstName" placeholder="FirstName" />
        <input type="text" v-model="formData.LastName" placeholder="LastName" /> 
        <input type="text" v-model="formData.Address" placeholder="Address" />


        <button>Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import axios from 'axios';
import router from '@/router';
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, sameAs, email } from '@vuelidate/validators';

const formData = reactive({
  Email: '',
  Password: '',
  PhoneNumber: '',
  FirstName: '',
  LastName: '',
  Address: '',
  ConfirmPassword: '',
});

const alphaOnly = (value) => /^[a-zA-Z]+$/i.test(value); // Only letters 
const alphaNum = value => /^[0-9]+$/.test(value); // Only numbers

const rules = computed(() => ({
  Email: {
    required,
    email
  },
  PhoneNumber: {
    required,
    alphaNum,
    minLength: minLength(10),
    maxLength: maxLength(10),
  },
  Address: {
    required,
  },
  Password: {
    required,
    minLength: minLength(8)
    
  },
  ConfirmPassword: {
    required,
    sameAsPassword: sameAs(formData.Password)
  },
  FirstName: {
    required,
    alphaOnly
   },
  LastName: {
    required,
    alphaOnly
   }
}));

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  console.log(result);
  if (result) {
    console.log('Form is valid!');
    const newUser = {
      Email: formData.Email,
      Password: formData.Password,
      PhoneNumber: formData.PhoneNumber,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Address: formData.Address
    };
    try {
      console.log(newUser);
      const response = await axios.post('http://51.21.191.73:3000/api/user/createUser', newUser);
      console.log(response.data);
      router.push({ name: 'Login' });
    } catch (error) {
      console.log("Error creating User", error);
    }
  } else {
    console.log('Form is invalid!');
    console.log(v$.value.$errors);
  }
};
</script>

<style>
#header {
  padding-bottom: 20px;
}
.register input {
  width: 320px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid;
}
.register button {
  width: 320px;
  height: 40px;
  border: 1px solid;
  background: green;
  color: black;
  cursor: pointer;
}
</style>