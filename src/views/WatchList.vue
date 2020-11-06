<template>
  <div class="watch-list">
    <h1>Watch list page</h1>
    <h2>Under construction</h2>
    <p>{{ savedGames }}</p>
    <div v-if="savedGames">
      <GameList title="Your Watch list:" minimal :body="fetchBody" />
    </div>
    <div v-else>
      <p>
        Your watch list is empty
      </p>
      <p>Add some games to see them here</p>
    </div>
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "WatchList",
  components: {
    GameList
  },
  computed: {
    savedGames() {
      // this retrives the values we want from local storage if any exists
      // and checks that they are basic numbers
      if (localStorage.getItem("watchlist")) {
        const unCheckedIds = localStorage.getItem("watchlist").split(",");
        const checkedIds = unCheckedIds.filter(el => {
          if (!isNaN(el)) return el;
        });
        return checkedIds.toString();
      }
      return false;
    },
    fetchBody() {
      return this.savedGames
        ? `fields *, cover.image_id, genres.name, platforms.*, keywords.*; sort first_release_date asc;
            where id = (${this.savedGames});
            limit 50;`
        : false;
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
