<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <GameList title="The games are coming..." />
</template>

<script>
import GameList from "./components/GameList.vue";

export default {
  name: "App",
  components: {
    GameList
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
