<template>
  <div class="watch-list">
    <img alt="Watch list logo" src="@/assets/logos/logo-watch-list.png" />
    <div v-if="savedGames">
      <GameList title="Your Watch list:" minimal :body="fetchBody" />
    </div>
    <div v-else>
      <p>
        Your watch list is empty.
      </p>
      <p>Add some games to see them here.</p>
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
.watch-list {
  width: 100%;
}
h1 {
  margin-bottom: 2rem;
}
p {
  margin-top: 0.5rem;
}
</style>
