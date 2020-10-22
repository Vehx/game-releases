<template>
  <div class="xbox">
    <img alt="Xbox logo" src="@/assets/logos/logo-xbox-one.png" />
    <GameList title="Xbox game releases: " :platform="49" />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Xbox",
  components: {
    GameList
  }
};
</script>
