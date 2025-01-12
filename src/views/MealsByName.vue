<template>
  <div class="mx-10 flex items-center mt-6">
    <!-- Search Input -->
    <input
      v-model="keyword"
      type="text"
      placeholder="Search for meals..."
      class="rounded-l-md bg-white w-full max-w-full border border-gray-300 outline-none focus:ring-[0.2px] focus:ring-blue-400 focus:border-blue-400 p-3"
    />
    <button
      @click="searchMeals"
      class="bg-blue-500 text-white px-6 py-[.8rem] rounded-r-md hover:bg-blue-600 transition-all focus:ring-[0.2px] focus:ring-blue-400"
    >
      Search
    </button>
  </div>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mt-8">
    <!-- Meal Card -->
    <div
      v-for="meal in meals"
      :key="meal.idMeal"
      class="bg-white shadow-lg rounded-lg transform transition hover:scale-105 duration-300"
    >
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-40 object-cover rounded-t-lg"
      />
      <div class="p-4">
        <h1 class="text-lg font-medium text-gray-700 truncate">
          {{ meal.strMeal }}
        </h1>
        <div class="flex items-center justify-between mt-2">
          <p class="text-sm text-gray-500">{{ meal.strCategory }}</p>
          <a
            :href="`#/meal/${meal.idMeal}`"
            class="rounded-md px-3 py-1 bg-blue-500 text-white text-sm hover:bg-blue-600 transition-all"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import { useRoute } from "vue-router";

const route = useRoute();
const keyword = ref("");
const meals = computed(() => store.state.searchedMeals);

const searchMeals = () => {
  store.dispatch("searchMeals", keyword.value);
};

onMounted(() => {
  keyword.value = route.params.name || "";
  if (keyword.value) {
    searchMeals();
  }
});
</script>
