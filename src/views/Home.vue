<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logos/logo-home.png" />
    <!-- <p>This site shows countdowns to game releases for the next 7 days</p> -->
    <div class="welcome">
      <p>Welcome to Game Releases,</p>
      <p>
        a site to get a quick overview of what <br />
        video games are releasing soon.
      </p>
    </div>
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
  margin: 0 1rem;
  line-height: 1.3rem;
}
</style>
