<template>
    <Navbar />
    <div class="user-profile">
        <h1>User Profile</h1>
        <div class="profile-details">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Joined:</strong> {{ user.joined }}</p>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
    name: 'UserProfile',
    data() {
        return {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                joined: 'January 1, 2020'
            }
        };
    }
};
</script>

<style scoped>
.user-profile {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 400px;
    margin: 0 auto;
}

.profile-details p {
    margin: 10px 0;
}
</style>