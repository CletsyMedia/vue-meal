import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import MealsByName from "../views/MealsByName.vue"
import MealsByLetter from "../views/MealsByLetter.vue"
import MealsByIngredient from "../views/MealsByIngredient.vue"
import DefaultLayout from "../components/DefaultLayout.vue";

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: "/",
                name: "home",
                component: Home,
            },
            {
                path: "/by-letter/:letter?",
                name: "by-letter",
                component: MealsByLetter,
            },
            {
                path: "/by-ingredient/:ingredient?",
                name: "by-ingredient",
                component: MealsByIngredient,
            },
            {
                path: "/by-name/:name?",
                name: "by-name",
                component: MealsByName,
            },
        ]
    }
    ,

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
