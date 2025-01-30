<template>

  <div class="bg-white h-4 w-full fixed top-16 left-0 right-0 z-50 shadow-xl">
    <div class="fixed w-[94%] z-50 left-0 right-0 mx-auto flex items-center mt-6">
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
  </div>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 mt-36">
    <div
      v-for="meal in meals"
      :key="meal.idMeal"
      class="bg-white shadow-lg rounded-lg transform transition hover:scale-105 duration-300 cursor-pointer"
      @click="navigateToDetail(meal.idMeal)"
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
            :href="`https://www.youtube.com/results?search_query=${meal.strMeal}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-2 px-4 py-1 rounded-[4px] bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M23.498 6.186a2.88 2.88 0 00-2.02-2.036C19.672 3.61 11.991 3.61 11.991 3.61h-.006s-7.682 0-9.487.54A2.88 2.88 0 00.48 6.186 30.274 30.274 0 000 12c0 2.42.157 4.802.48 5.813a2.88 2.88 0 002.02 2.036c1.805.54 9.487.54 9.487.54h.006s7.682 0 9.487-.54a2.88 2.88 0 002.02-2.036c.323-1.01.48-3.392.48-5.813a30.274 30.274 0 00-.48-5.813zM9.746 15.233V8.766l6.333 3.234-6.333 3.233z"
              />
            </svg>
            <span>Watch</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const keyword = ref("");
const meals = computed(() => store.state.searchedMeals);

const searchMeals = () => {
  store.dispatch("searchMeals", keyword.value);
};

const navigateToDetail = (mealId) => {
  router.push({ name: "mealDetails", params: { id: mealId } });
};

onMounted(() => {
  keyword.value = route.params.name || "";
  if (keyword.value) {
    searchMeals();
  }
});
</script>
