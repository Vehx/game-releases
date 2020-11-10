<template>
  <TheNavigation />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component class="content" :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
export default {
  components: {
    TheNavigation
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: "Epilogue", Helvetica, Arial, sans-serif;
}
:root {
  --color-highlight: #49a170;
  --color-normal: #dfdfdf;
  --color-background-main: #161616;
  --color-background-faded: #282828;
  --color-error: darkred;
  --color-disabled: #838383;
}
html {
  background-color: var(--color-background-main);
}
#app {
  font-family: "Epilogue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-normal);
  max-width: 100vw;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.content {
  padding-top: 5rem;
}
</style>
