<template>
  <nav
    id="nav"
    :class="[{ open: isMenuOpen, menu: !isMobile, hamburger: isMobile }]"
  >
    <router-link to="/">Home</router-link>
    <router-link to="/pc">PC</router-link>
    <router-link to="/playstation">Playstation</router-link>
    <router-link to="/xbox">Xbox</router-link>
    <router-link to="/switch">Switch</router-link>
    <router-link to="/search">Search</router-link>
    <router-link to="/watch-list">Watch list</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <div class="buttons">
    <a href="#app">
      <button class="button-top" :class="{ hidden: isAtTop }">
        Top
      </button>
    </a>
    <button
      class="button-menu"
      :class="{ hidden: !isMobile }"
      @click="toggleMenu"
    >
      Menu
    </button>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
  data() {
    return {
      isMenuOpen: false,
      isAtTop: true,
      toTopOffset: 200,
      isMobile: true,
      mobileMaxWidth: 768
    };
  },
  created() {
    // sets scroll listener as passive for increeased performance
    window.addEventListener("scroll", this.toggleToTop, { passive: true });
    window.addEventListener("resize", this.checkWindowWidth, { passive: true });
  },
  unmounted() {
    window.removeEventListener("scroll", this.toggleToTop);
    window.removeEventListener("resize", this.checkWindowWidth);
  },
  methods: {
    toggleMenu() {
      // this disables scrolling on page while hamburger menu is open
      if (this.isMenuOpen) {
        document.documentElement.style.overflow = "auto";
      } else {
        document.documentElement.style.overflow = "hidden";
      }
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleToTop() {
      this.isAtTop = window.pageYOffset <= this.toTopOffset;
    },
    checkWindowWidth() {
      this.isMobile = window.innerWidth <= this.mobileMaxWidth;
      // console.log(this.isMobile);
      // console.log(window.innerWidth);
    }
  },
  watch: {
    $route() {
      document.documentElement.style.overflow = "auto";
      this.isMenuOpen = false;
    }
  }
};
</script>

<style scoped>
/* link styling */
a {
  font-weight: bold;
  color: var(--color-normal);
}
a.active-link {
  color: var(--color-highlight);
}
/* desktop menu styling */
.menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
}
/* hamburger menu styling */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  background-color: var(--color-background-faded);
  overflow-x: hidden;
  transition: 0.5s;
}
button {
  height: 64px;
  width: 64px;
  border: none;
  border-radius: 100%;
  background-color: var(--color-normal);
  position: fixed;
}
.button-menu {
  bottom: 20px;
  right: 10px;
  z-index: 1000;
}
.button-top {
  bottom: 104px;
  right: 10px;
}
.open {
  width: 100%;
}
.hidden {
  display: none;
}
</style>
