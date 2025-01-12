<script setup >
import Navbar from './Navbar.vue';

</script>

<template>
    <div class="bg-gray-100">
        <Navbar />
        <main class="mt-24 min-h-screen bg-white">
            <router-view />
        </main>
    </div>
</template>
