import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { nextTick } from "vue";

const mainTitle = "Game releases";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: () => {
        return mainTitle;
      }
    },
    component: Home
  },
  {
    path: "/pc",
    name: "Pc",
    meta: {
      title: () => {
        return `PC | ${mainTitle}`;
      }
    },
    component: () =>
      import(/* webpackChunkName: "PlatformPc" */ "../views/PlatformPc.vue")
  },
  {
    path: "/playstation",
    name: "Playstation",
    meta: {
      title: () => {
        return `Playstation | ${mainTitle}`;
      }
    },
    component: () =>
      import(
        /* webpackChunkName: "PlatformPlaystation" */ "../views/PlatformPlaystation.vue"
      )
  },
  {
    path: "/xbox",
    name: "Xbox",
    meta: {
      title: () => {
        return `Xbox | ${mainTitle}`;
      }
    },
    component: () =>
      import(/* webpackChunkName: "PlatformXbox" */ "../views/PlatformXbox.vue")
  },
  {
    path: "/switch",
    name: "Switch",
    meta: {
      title: () => {
        return `Switch | ${mainTitle}`;
      }
    },
    component: () =>
      import(
        /* webpackChunkName: "PlatformSwitch" */ "../views/PlatformSwitch.vue"
      )
  },
  {
    path: "/search",
    name: "Search",
    meta: {
      title: () => {
        return `Search | ${mainTitle}`;
      }
    },
    component: () =>
      import(/* webpackChunkName: "Search" */ "../views/Search.vue")
  },
  {
    path: "/watch-list",
    name: "WatchList",
    meta: {
      title: () => {
        return `Watch list | ${mainTitle}`;
      }
    },
    component: () =>
      import(/* webpackChunkName: "WatchList" */ "../views/WatchList.vue")
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: () => {
        return `About | ${mainTitle}`;
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/details/:slug",
    name: "GameDetails",
    meta: {
      title: () => {
        return ` Game details | ${mainTitle}`;
      }
    },
    component: () =>
      import(/* webpackChunkName: "GameDetails" */ "../views/GameDetails.vue")
  },
  {
    path: "/404",
    name: "NotFound",
    meta: {
      title: () => {
        return `404 | ${mainTitle}`;
      }
    },
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue")
  },

  {
    // this matches path with a regex to send them to the 404 not found page
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFound" }
  }
];

const router = createRouter({
  linkExactActiveClass: "active-link",
  history: createWebHistory(),
  routes,
  // this makes it so when clicking a router link leading to the page user is currently on
  // it scrolls to the top of the page
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  }
});
router.afterEach(to => {
  nextTick(() => {
    document.title = to.meta.title(to) || mainTitle;
  });
});
export default router;
