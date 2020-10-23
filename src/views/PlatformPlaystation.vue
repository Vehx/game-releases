<template>
  <div class="playstation">
    <img alt="Playstation logo" src="@/assets/logos/logo-ps-4.png" />
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

<style scoped>
img {
  border-radius: 15px;
  border: 10px solid var(--color-background-faded);
  background-color: var(--color-background-faded);
  /* height: 160px;
  width: 284px; */
}
</style>
