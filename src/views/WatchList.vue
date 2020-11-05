<template>
  <div class="watch-list">
    <h1>Watch list page</h1>
    <h2>Under construction</h2>
    <p>{{ savedGames }}</p>
    <GameLi :game="testGame" />
    <button @click="addToWatchList">Add to watch list</button>
    <button @click="removeFromWatchList">Remove from watch list</button>
    <div v-if="savedGames">
      <GameList title="Watch list" minimal :body="fetchBody" />
    </div>
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";
import GameLi from "@/components/GameLi.vue";

export default {
  name: "WatchList",
  components: {
    GameLi,
    GameList
  },
  data() {
    return {
      testGame: {
        name: "Test Valhalla",
        id: 133004,
        platforms: [
          {
            id: 6,
            name: "PC LOLE"
          },
          {
            id: 8,
            name: "Nope station xXx"
          }
        ],
        first_release_date: 1609000000,
        slug: "assassins-creed-valhalla"
      }
    };
  },
  computed: {
    savedGames() {
      // this retrives the values we want from local storage
      return localStorage.getItem("watchlist");
    },
    fetchBody() {
      return this.savedGames
        ? `fields *, cover.image_id, genres.name, platforms.*, keywords.*; sort first_release_date asc;
            where id = (${this.savedGames});
            limit 50;`
        : false;
    }
  },
  methods: {
    addToWatchList() {
      // this.game.id when in GameLi
      if (localStorage.getItem("watchlist")) {
        let currentStorage = localStorage.getItem("watchlist");
        currentStorage += `,${this.testGame.id}`;
        localStorage.setItem("watchlist", currentStorage);
      } else {
        localStorage.setItem("watchlist", this.testGame.id);
      }
      // console.log(currentStorage);
    },
    removeFromWatchList() {
      let currentStorage = localStorage.getItem("watchlist");
      let storageArray = currentStorage.split(",");
      storageArray.splice(storageArray.indexOf(this.testGame.id), 1);
      if (storageArray.length < 1) localStorage.removeItem("watchlist");

      currentStorage = storageArray.toString();
      console.log(currentStorage);
      localStorage.setItem("watchlist", currentStorage);
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
