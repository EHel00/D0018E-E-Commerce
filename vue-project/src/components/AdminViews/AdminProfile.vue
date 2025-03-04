<template>
    <AdminNavbar />
    <div>
        <h1>Your profile</h1>
    </div>
        <div class ="form-container">
            <form @submit.prevent="handleSubmit">
                <div class="form-row">
                    <div class="form-group">
                        <label>First name</label>
                        <input type="text" v-model = "formData.firstName" />
                        <span v-if="v$.firstName.$error" class="error">Only letters allowed</span>
                    </div>
                    <div class="form-group">
                        <label>Last name</label>
                        <input type="text" v-model = "formData.lastName" />
                        <span v-if="v$.firstName.$error" class="error">Only letters allowed</span>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" v-model = "formData.Email" />
                        <span v-if="v$.Email.$error" class="error">{{v$.Email.$error[0].$message}} </span>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" v-model = "formData.address" />
                        <span v-if="v$.address.$error" class="error">Address required</span>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Phonenumber</label>
                        <input type="tel" v-model = "formData.phoneNumber" />
                        <span v-if="v$.phoneNumber.$error" class="error">Phone number needs to be 10 digits </span>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" v-model = "formData.address" />
                        <span v-if="v$.address.$error" class="error">Address required</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model = "formData.phoneNumber" />
                        <span v-if="v$.phoneNumber.$error" class="error">{{ v$.password.$errors[0].$message }} </span>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="text" v-model = "formData.address" />
                        <span v-if="v$.confirmPassword.$error" class="error">Password must match</span>
                    </div>
                </div>

                <button type="submit">Update</button>
            </form>

    </div>

</template>
<script setup>
import AdminNavbar from '@/components/AdminNavBar.vue';
import { ref, onMounted, reactive } from 'vue';
import apiClient from '@/config/axios';


const error = ref(null);

const formData = reactive({
    firstName: '',
    lastName: '',
    Email: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
});

</script>