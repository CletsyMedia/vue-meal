<template>
  <div class="mx-10">
    <input
      type="text"
      placeholder="Search for meals..."
      class="input bg-transparent w-full max-w-full outline-none border-blue-300 focus:outline-blue-400 focus:ring-1"
      @change="searchMeals"
    />
  </div>
  <div
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 mt-4"
  >
    <div
      v-for="meal in meals"
      :key="meal.idMeal"
      class="bg-white shadow-md rounded-md py-4"
    >
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-40 object-cover rounded-t-md"
      />

      <div class="flex flex-col items-center px-2">
        <h1 class="text-xl font-semibold text-blue-500 self-start">{{ meal.strMeal }}</h1>
        <div class="flex items-center justify-between w-full">
          <p class="text-gray-500">{{ meal.strCategory }}</p>
          <!-- <router-link
          :to="{ name: 'meal', params: { id: meal.idMeal } }"
          class="btn bg-blue-500 text-white mt-2"
          >View Details</router-link
        > -->
        <a
          :href="`#/meal/${meal.idMeal}`"
          class="rounded-md p-2 bg-blue-500 text-white hover:bg-opacity-90"
          >View Details</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store from "../store";

const keyword = ref("");
const meals = computed(() => store.state.searchedMeals);

const searchMeals = () => {
  store.dispatch("searchMeals", keyword.value);
};
</script>
