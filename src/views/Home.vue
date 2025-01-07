<template>
<div class="flex flex-col p-8">
    <input type="text" placeholder="Type here" class="input bg-transparent input-bordered w-full max-w-full" />

    <div class="flex justify-center gap-2 mt-2">
        <router-link :to="{name: 'by-letter', params: {letter}}" v-for="letter of letters" :key="letter">
            {{ letter  }}
        </router-link>
    </div>
</div>
</template>

<script setup>
import { computed } from 'vue';
import store from '../store'

const meals = computed(() => store.state.meals)
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
</script>
