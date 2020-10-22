<template>
  <div class="switch">
    <img alt="Switch logo" src="@/assets/logos/logo-nintendo-switch.png" />
    <GameList title="Switch game releases: " :platform="130" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
  name: "Switch",
  components: {
    GameList
  }
};
</script>
