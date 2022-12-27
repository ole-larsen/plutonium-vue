import { createRouter, createWebHistory } from "vue-router";
import Home01View from "../views/Home01View.vue";
import Home02View from "../views/Home02View.vue";
import Home03View from "../views/Home03View.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home01View,
    },
    { path: "/home-01",        redirect: "/"},
    { path: "/home-02",        name: "Home-02",       component: Home02View },
    { path: "/home-03",        name: "Home-03",       component: Home03View },
    {
      path: "/card/:id",
      name: "card",
      // route level code-splitting
      // this generates a separate chunk (ItemDetails.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/template/Card/ItemDetails.vue"),
    },
    {
      path: "/profile/:uuid",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/author/:uuid",
      name: "author",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AuthorView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
// {
//           path: "/profile",
//           name: "Profile",
//           component: Page,
//           children: [
//             { path: "/profile/:uuid",            name: "Profile",       component: Profile },
//           ]
//         },