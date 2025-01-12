<template>
  <div class="flex flex-col p-8 w-full">
    <div class="flex justify-center gap-2 mt-2">
      <router-link
        :to="{ name: 'by-letter', params: { letter } }"
        v-for="letter of letters"
        :key="letter"
      >
        {{ letter }}
      </router-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div
        v-for="ingredient in ingredients"
        :key="ingredient.idIngredient"
        class="bg-white shadow-md rounded-md p-4"
      >
        <h1 class="text-xl font-semibold text-blue-500">
          {{ ingredient.strIngredient }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import axiosInstance from "../axiosClient";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ingredients = ref([]);

onMounted(async () => {
  const response = await axiosInstance.get("/list.php?i=list");
  ingredients.value = response.data.meals;
});
</script>
