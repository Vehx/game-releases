<template>
  <div class="pc">
    <img alt="PC logo" src="@/assets/logos/logo-win-10.png" />
    <GameList title="PC game releases: " :platform="6" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
  name: "Pc",
  components: {
    GameList
  }
};
</script>
