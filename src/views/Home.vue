<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <GameList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
  name: "Home",
  components: {
    GameList
  }
};
</script>
