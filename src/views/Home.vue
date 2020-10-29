<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logos/logo-home.png" />
    <p>This site shows countdowns to game releases for the next 7 days</p>
    <GameList title="All game releases: " />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Home",
  components: {
    GameList
  }
};
</script>

<style scoped>
p {
  margin: 0 0.2rem;
}
</style>
