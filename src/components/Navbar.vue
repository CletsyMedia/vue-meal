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
  <header class="fixed top-0 left-0 right-0 w-full z-50">
    <nav class="bg-white shadow h-20 flex items-center justify-between px-6">
      <!-- Logo -->
      <router-link :to="{ name: 'home' }" class="text-2xl font-bold text-blue-500">
        Meal Finder
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex space-x-6">
        <router-link
          v-for="(link, index) in navLinks"
          :key="index"
          :to="link.route"
          class="h-20 px-4 inline-flex items-center text-gray-600 hover:text-blue-500 transition-colors"
          active-class="text-blue-500 font-semibold"
        >
          {{ link.name }}
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden bg-gray-100 p-2 rounded-md text-gray-700 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
        <XMarkIcon v-else class="h-6 w-6" />
      </button>
    </nav>

    <!-- Mobile Navigation -->
    <transition name="slide">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-white z-40 flex flex-col space-y-4 p-6 shadow-lg"
      >
        <div class="flex justify-between items-center mb-6">
          <router-link :to="{ name: 'home' }" class="text-2xl font-bold text-blue-500">
            Meal Finder
          </router-link>
          <button @click="toggleMobileMenu" class="text-gray-700 focus:outline-none">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <router-link
          v-for="(link, index) in navLinks"
          :key="index"
          :to="link.route"
          class="text-lg font-medium text-gray-700 transition-colors hover:text-blue-500 px-4 py-3 rounded-lg hover:bg-gray-100"
          active-class="text-blue-500 font-semibold"
          @click="toggleMobileMenu"
        >
          {{ link.name }}
        </router-link>
      </div>
    </transition>
  </header>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(50%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>
