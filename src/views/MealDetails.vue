<template>
  <div class="p-6 md:p-10 max-w-4xl mx-auto">
    <!-- Back Button -->
    <button
      @click="$router.go(-1)"
      class="flex items-center text-blue-600 hover:text-blue-700 transition-all mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>

    <!-- Meal Card -->
    <div
      v-if="meal"
      class="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Meal Image -->
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-60 object-cover"
      />
      <!-- Meal Details -->
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ meal.strMeal }}
        </h1>
        <p class="text-gray-600 mb-4">
          <span class="font-semibold">Category:</span> {{ meal.strCategory }} |
          <span class="font-semibold">Area:</span> {{ meal.strArea }}
        </p>

        <!-- Ingredients and Measurements -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Ingredients:
          </h2>
          <ul class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600">
            <li
              v-for="(ingredient, index) in ingredients"
              :key="index"
              v-if="ingredient"
              class="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ ingredient.name }}
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Method:
          </h2>
          <div class="space-y-4 text-gray-600">
            <div
              v-for="(step, index) in formattedInstructions"
              :key="index"
              class="leading-relaxed"
            >
              <strong class="block text-gray-800">
                Step {{ index + 1 }}
              </strong>
              <p>{{ step }}</p>
            </div>
          </div>
        </div>

        <div v-if="meal.strSource" class="mb-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Source:</h2>
          <a
            :href="meal.strSource"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            Click here for more original recipe source
          </a>
        </div>

        <div class="flex justify-start">
          <a
            :href="meal.strYoutube"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M23.498 6.186a2.88 2.88 0 00-2.02-2.036C19.672 3.61 11.991 3.61 11.991 3.61h-.006s-7.682 0-9.487.54A2.88 2.88 0 00.48 6.186 30.274 30.274 0 000 12c0 2.42.157 4.802.48 5.813a2.88 2.88 0 002.02 2.036c1.805.54 9.487.54 9.487.54h.006s7.682 0 9.487-.54a2.88 2.88 0 002.02-2.036c.323-1.01.48-3.392.48-5.813a30.274 30.274 0 00-.48-5.813zM9.746 15.233V8.766l6.333 3.234-6.333 3.233z"
              />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-gray-500 flex items-center justify-center h-screen">
      <svg
        class="animate-spin h-10 w-10 text-blue-500 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 12h4zm2 5.291V16H0v5.291c0 1.507 1.088 2.712 2.558 2.899 4.046.472 8.52.472 12.567 0 1.47-.187 2.558-1.392 2.558-2.899V16h-6v1.291c-2.075.496-4.362.496-6.437 0z"
        ></path>
      </svg>
      <p class="text-lg font-medium">Loading meal details...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "../api/axiosClient";

const route = useRoute();
const meal = ref(null);

// Extract Ingredients
const ingredients = computed(() => {
  if (!meal.value) return [];
  return Array.from({ length: 20 }, (_, i) => {
    const name = meal.value[`strIngredient${i + 1}`];
    const measure = meal.value[`strMeasure${i + 1}`];
    return name
      ? `${name} (${measure.trim() || ""})`
      : null;
  }).filter(Boolean);
});

// Format Instructions
const formattedInstructions = computed(() => {
  if (!meal.value || !meal.value.strInstructions) return [];
  return meal.value.strInstructions
    .split(". ")
    .map((step) => step.trim())
    .filter((step) => step.length > 6);
});

onMounted(() => {
  axiosInstance.get(`/lookup.php?i=${route.params.id}`).then(({ data }) => {
    if (data.meals && data.meals.length > 0) {
      meal.value = data.meals[0];
    }
  });
});
</script>
