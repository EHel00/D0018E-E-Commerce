<template>
    <AdminNavbar />
    <h1>Create new profile</h1>
    <RouterLink :to="{name: 'AdminProfile'}">Your profile</RouterLink>
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
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" v-model = "formData.password" />
                        <span v-if="v$.phoneNumber.$error" class="error">{{ v$.password.$errors[0].$message }} </span>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" v-model = "formData.confirmPassowrd" />
                        <span v-if="v$.confirmPassword.$error" class="error">Password must match</span>
                    </div>
                </div>

                <button type="submit">Create admin</button>
            </form>

    </div>

</template>
<script setup>
import AdminNavbar from '@/components/AdminNavBar.vue';
import { ref, onMounted, reactive } from 'vue';
import apiClient from '@/config/axios';
import { computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, sameAs, email } from '@vuelidate/validators';


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
const alphaOnly = (value) => /^[a-zA-Z]+$/i.test(value); // Only letters
const alphaNum = value => /^[0-9]+$/.test(value); // Only numbers

const rules = computed(() => ({
    firstName: {
        required,
        alphaOnly,
    },
    lastName: {
        required,
        alphaOnly,
    },
    Email: {
        required,
        email,
    },
    address: {
        required,
    },
    phoneNumber: {
        required,
        alphaNum,
        minLength: minLength(10),
        maxLength: maxLength(10),
    },
    password: {
        required,
    },
    confirmPassword: {
        required,
        sameAsPassword: sameAs(formData.password),
    },
}));

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    const result = v$.value.$validate();
    if (result) {
        const send = {
            Email: formData.Email,
            Password: formData.password,
            PhoneNumber: formData.phoneNumber,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Address: formData.address
        };
        try {
            console.log(send);
            const response = await apiClient.post('/user/createAdmin', send);
            console.log(response);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
};

const fetchProfile = async () => {
    try {
        const response = await apiClient.get('/user/getUser');
        console.log(response.data);
        formData.firstName = response.data.firstName;
        formData.lastName = response.data.lastName;
        formData.Email = response.data.Email;
        formData.address = response.data.address;
        formData.phoneNumber = response.data.phoneNumber;

    }catch (error) {
        console.error('Error fetching profile:', error);
    }
};
onMounted (() => {
    fetchProfile();
});
</script>

<style scoped>

.form-container {
    display: flex;
}
form {
    padding: 20px;
    border-style: solid;
    border-color: white;
    border-width: 3px;
    border-radius: 5px;
}
.form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}
input, label {
    display: block;
}
button, input {
    font-size: 1.2rem;
    padding: 10px;
    box-sizing: border-box;
}

button {
    width: 100%;
    margin: 10px auto;
    border: solid;
    border-radius: 5px;
    border-color: white;
}
h1{
    height: auto;
    margin-bottom: 10px;
    position: relative;
    grid-row: 1;

}
</style>