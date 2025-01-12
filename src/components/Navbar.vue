<script setup>
import { ref } from "vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

// Mobile menu state
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const navLinks = [
    { name: "Meals By Name", route: { name: "by-name" } },
    { name: "Meals By Letter", route: { name: "by-letter" } },
    { name: "Meals By Ingredients", route: { name: "by-ingredient" } },
];
</script>

<template>
    <header class="fixed top-0 left-0 right-0 w-full z-10">
        <nav class="bg-white shadow h-20 flex items-center justify-between p-4">
            <router-link :to="{ name: 'home' }" class="text-xl font-bold">
                Meal Finder
            </router-link>
            <!-- Desktop Navigation -->
            <div class="hidden lg:flex space-x-4">
                <router-link
                    v-for="(link, index) in navLinks"
                    :key="index"
                    :to="link.route"
                    class="h-20 px-4 inline-flex items-center transition-colors hover:bg-blue-100"
                    active-class="text-blue-500 font-semibold">
                    {{ link.name }}
                </router-link>
            </div>
            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu" class="lg:hidden bg-gray-200 p-2 rounded text-black z-50">
                <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
                <XMarkIcon v-else class="h-6 w-6" />
            </button>
        </nav>
        <!-- Mobile Navigation -->
        <div :class="[
            'absolute h-screen top-0 right-0 w-1/2 bg-white shadow-lg z-20 transition-transform transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'right-0' : '-right-[90rem]'
        ]">
            <div class="flex flex-col space-y-3 pt-20 px-6">
                <router-link
                    v-for="(link, index) in navLinks"
                    :key="index"
                    :to="link.route"
                    class="text-lg font-medium transition-colors hover:text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
                    active-class="text-blue-500 font-semibold"
                    @click="toggleMobileMenu">
                    {{ link.name }}
                </router-link>
            </div>
        </div>
    </header>
</template>
