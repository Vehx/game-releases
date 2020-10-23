<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
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
