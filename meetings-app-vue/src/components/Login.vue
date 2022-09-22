<template>
    <div class="body">
        <h1 class="welcome">Welcome to Meetings App</h1>
        <LoginRegister></LoginRegister>
    </div>
</template>


<script>

import LoginRegister from '@/components/LoginRegister.vue'

export default {
    components: {
    LoginRegister,
  },
    }
</script>

<style scoped>

.body {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    font-family: 'Cormorant', serif;
    background: linear-gradient(to right, #fff, #fff);
    width: 100%;
    height: 100vh;
}
.welcome{
    color: white;
}
</style>
