<template>
  <div class="playstation">
    <img alt="Playstation logo" src="@/assets/logos/logo-ps-4.png" />
    <GameList title="Playstation game releases: " :body="fetchBody" />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
  name: "Playstation",
  components: {
    GameList
  },
  data() {
    return {
      platformId: 48
    };
  },
  computed: {
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    fetchBody() {
      return `fields *, cover.image_id, genres.name, platforms.*, keywords.*; sort first_release_date asc;
             where platforms = (${this.platformId}) &
             first_release_date > ${this.now} & first_release_date <
             ${this.now + 604800};
             limit 50;`;
    }
  }
};
</script>

<style scoped>
img {
  border-radius: 15px;
  border: 10px solid var(--color-background-faded);
  background-color: var(--color-background-faded);
}
</style>
