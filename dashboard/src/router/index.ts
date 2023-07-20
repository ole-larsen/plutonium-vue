import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import { useAuthStore } from "@/stores/auth";
import LoginView from "@/views/auth/LoginView.vue";
import SignupView from "@/views/auth/SignupView.vue";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue";
import Ga2faView from "@/views/auth/Ga2faView.vue";

import FilesView from "@/views/pages/FilesView.vue";
import SlidersView from "@/views/pages/SlidersView.vue";
import ContactsView from "@/views/pages/ContactsView.vue";
import WalletsView from "@/views/pages/WalletsView.vue";
import HelpCenterView from "@/views/pages/HelpCenterView.vue";
import FaqsView from "@/views/pages/FaqsView.vue";
import AuthorsView from "@/views/pages/AuthorsView.vue";
import CategoriesView from "@/views/pages/CategoriesView.vue";
import PagesView from "@/views/pages/PagesView.vue";
import BlogsView from "@/views/pages/BlogsView.vue";
import MenuView from "@/views/pages/MenuView.vue";
import TagsView from "@/views/pages/TagsView.vue";
import CreateAndSellView from "@/views/pages/CreateandSellView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: "/",
      name: "Home",
      component: DashboardLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/Dashboard.vue"),
        },
        {
          path: "/dashboard/files",
          name: "files",
          component: FilesView
        },
        {
          path: "/dashboard/sliders",
          name: "sliders",
          component: SlidersView
        },
        {
          path: "/dashboard/contacts",
          name: "contacts",
          component: ContactsView
        },
        {
          path: "/dashboard/wallets",
          name: "wallets",
          component: WalletsView
        },
        {
          path: "/dashboard/help-center",
          name: "helpCenter",
          component: HelpCenterView
        },
        {
          path: "/dashboard/faqs",
          name: "faqs",
          component: FaqsView
        },
        {
          path: "/dashboard/authors",
          name: "authors",
          component: AuthorsView
        },
        {
          path: "/dashboard/categories",
          name: "categories",
          component: CategoriesView
        },
        {
          path: "/dashboard/pages",
          name: "pages",
          component: PagesView
        },
        {
          path: "/dashboard/blogs",
          name: "blogs",
          component: BlogsView
        },
        {
          path: "/dashboard/tags",
          name: "tags",
          component: TagsView
        },
        {
          path: "/dashboard/menu",
          name: "menu",
          component: MenuView
        },
        {
          path: "/dashboard/create-and-sell",
          name: "createAndSell",
          component: CreateAndSellView
        },
      ]
    },
    { path: '/login',           component: LoginView },
    { path: '/signup',          component: SignupView },
    { path: '/forgot-password', component: ForgotPasswordView },
    { path: '/2fa',             component: Ga2faView },
  ]
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/signup', '/forgot-password'];
  const authRequired = !publicPages.includes(to.path);
  const auth: any = useAuthStore();
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;
  if (!user)
  if (authRequired && !auth.user && !auth.token) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
});
export default router