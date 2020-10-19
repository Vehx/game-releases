<template>
  <div class="playstation">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <GameList title="Playstation game releases: " :platform="48" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
  name: "Playstation",
  components: {
    GameList
  }
};
</script>
