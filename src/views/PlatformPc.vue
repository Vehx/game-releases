<template>
  <div class="pc">
    <img
      alt="Vue logo"
      src="//images.igdb.com/igdb/image/upload/t_thumb/irwvwpl023f8y19tidgq.jpg"
    />
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
