import { createRouter, createWebHistory } from "vue-router";

import PageView from "@/views/PageView.vue";
import Home from "@/components/Pages/HomePage.vue";
import ContactUs from "@/components/Pages/ContactUsPage.vue";
import Faq from "@/components/Pages/FaqPage.vue";
import WalletConnect from "@/components/Pages/WalletConnectPage.vue";
import HelpCenter from "@/components/Pages/HelpCenterPage.vue";
import Blog from "@/components/Pages/BlogPage.vue";
import BlogDetails from "@/components/Pages/BlogDetailsPage.vue";
import Profile from "@/components/Pages/ProfilePage.vue";
import Collection from "@/components/Pages/CollectionPage.vue";
import Category from "@/components/Pages/CategoryPage.vue";
import CreateERC721 from "@/components/Pages/CreateERC721Page.vue";

import { usePageStore } from "@/stores/template/page";
import { useProfileStore } from "@/stores/template/profile";

import { error } from "@/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PageView,
      children: [
        {
          path: "/",
          name: "Home",
          component: Home,
        },
        {
          path: "/contact-us",
          name: "ContactUs",
          component: ContactUs,
        },
        {
          path: "/faq",
          name: "Faq",
          component: Faq,
        },
        {
          path: "/wallet-connect",
          name: "WalletConnect",
          component: WalletConnect,
        },
        {
          path: "/help-center",
          name: "HelpCenter",
          component: HelpCenter,
        },
        {
          path: "/blog",
          name: "Blog",
          component: Blog,
        },
        {
          path: "/blog/:slug",
          name: "BlogDetails",
          component: BlogDetails,
        },
        {
          path: "/profile/:uuid",
          name: "profile",
          component: Profile,
        },
        {
          path: "/profile/:uuid/create/erc721",
          name: "CreateERC721",
          component: CreateERC721,
        },
        {
          path: "/collection/:slug",
          name: "collection",
          component: Collection,
        },
        {
          path: "/category/:slug",
          name: "category",
          component: Category,
        },
      ],
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  const pageStore = usePageStore();
  const profileStore = useProfileStore();

  const path = to.path.split("/").filter((segment) => segment !== "");

  console.log(path);
  // home
  if (path.length === 0) {
    profileStore.setPath(null);
    pageStore.setPath(null);
    return next();
  }

  // pages
  if (path.length === 1) {
    const slug = path.join("/");
    profileStore.setPath(null);
    pageStore.setPath(slug);

    if (!pageStore.getPage(slug)) {
      try {
        await pageStore.loadPage(slug);
      } catch (e) {
        error(e);
      }
    }

    return next();
  }

  // profile
  if (path.length === 2) {
    if (path.includes("profile")) {
      const slug = path[path.length - 1];
      pageStore.setPath(null);
      profileStore.setPath(slug);

      return next();
    }
    if (path.includes("collection")) {
      //const slug = path[path.length - 1];
      pageStore.setPath(null);
      profileStore.setPath(null);
      return next();
    }
    if (path.includes("category")) {
      //const slug = path[path.length - 1];
      pageStore.setPath(null);
      profileStore.setPath(null);
      return next();
    }
  }
  if (path.length === 3) {
    if (path.includes("profile")) {
      const slug = path[path.length - 2];
      pageStore.setPath(null);
      profileStore.setPath(slug);

      return next();
    }
  }
  // create erc721
  if (path.length === 4) {
    if (path.includes("profile")) {
      const slug = path[path.length - 3];
      pageStore.setPath(null);
      profileStore.setPath(slug);

      return next();
    }
  }
});
export default router;
