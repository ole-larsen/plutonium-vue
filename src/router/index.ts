import { createRouter, createWebHistory } from "vue-router";
import Home01View from "../views/Home01View.vue";
import Home02View from "../views/Home02View.vue";
import Home03View from "../views/Home03View.vue";

import Blog from "../components/template/Blog/Blog.vue";
import BlogDetails from "../components/template/BlogDetails/BlogDetails.vue";

import {useBlogStore} from "@/stores/blog";
import {usePageStore} from "@/stores/page";
import {useAuthorStore} from "@/stores/author";
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
      path: "/contact-us",
      name: "ContactUs",
      component: () => import("../views/ContactUsView.vue"),
    },
    {
      path: "/wallet-connect",
      name: "WalletConnect",
      component: () => import("../views/WalletConnectView.vue"),
    },
    {
      path: "/faq",
      name: "Faq",
      component: () => import("../views/FaqView.vue"),
    },
    {
      path: "/help-center",
      name: "HelpCenter",
      component: () => import("../views/HelpCenterView.vue"),
    },
    {
      path: "/blog",
      name: "Blog",
      component: () => import("../views/BlogView.vue"),
      children: [
        { path: "",                 name: "Blog",        component: Blog },
        { path: "/blog/:slug",      name: "BlogDetails", component: BlogDetails },
      ]
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

router.beforeResolve(async (to, from, next) => {
  const pageStore = usePageStore();
  const blogStore = useBlogStore();
  const authorStore = useAuthorStore();

  let path = to.path.split("/").filter(segment => segment !== "");

  if (path.includes("blog") && path.length > 1) {
    const slug = path[path.length - 1];

    blogStore.setPath(slug);
    // @ts-ignore
    authorStore.setPath(null);
    // @ts-ignore
    pageStore.setPath(null);

    if (!blogStore.blog(slug)) {
      try {
        await blogStore.loadBlog(slug);
      } catch(e) {
        console.error(e);
      }
    }
    if (!blogStore.blog(slug)) {
      // @ts-ignore
      blogStore.setPath(null);
    }
    return next();
  }

  if (path.includes("authors") && path.length > 1) {
    const slug = path[path.length - 1];

    authorStore.setPath(slug);
    // @ts-ignore
    blogStore.setPath(null);
    // @ts-ignore
    pageStore.setPath(null);

    if (!authorStore.author(slug)) {
      try {
        await authorStore.loadAuthor(slug);
      } catch(e) {
        console.error(e);
      }
    }

    if (!authorStore.author(slug)) {
      // @ts-ignore
      authorStore.setPath(null);
    }

    return next();
  }

  if (path.includes("profile") && path.length > 1) {
    const slug = path[path.length - 1];

    // @ts-ignore
    authorStore.setPath(null);
    // @ts-ignore
    blogStore.setPath(null);
    // @ts-ignore
    pageStore.setPath("profile");

    return next();
  }

  if (path.includes("card") && path.length > 1) {
    return next();
  }
  const strPath = path.join("/");
  pageStore.setPath(strPath);
  // @ts-ignore
  authorStore.setPath(null);
  // @ts-ignore
  blogStore.setPath(null);

  if (!pageStore.page(strPath)) {
    try {
      await pageStore.loadPage(strPath);
    } catch(e) {
      console.error(e);
    }
  }
  return next();
});

export default router;
