import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

// learn more about router here: https://vueschool.io/lessons/vue-router-dynamic-routes

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/details/:slug",
    name: "GameDetails",
    component: () =>
      import(/* webpackChunkName: "GameDetails" */ "../views/GameDetails.vue")
  }
];

const router = createRouter({
  linkExactActiveClass: "active-link",
  history: createWebHashHistory(),
  routes
});

export default router;
