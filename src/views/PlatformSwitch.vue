<template>
  <div class="switch">
    <img
      alt="Vue logo"
      src="//images.igdb.com/igdb/image/upload/t_thumb/pleu.jpg"
    />
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
