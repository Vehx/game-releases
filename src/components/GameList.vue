<template>
  <div class="gamelist">
    <div class="title">
      <h1>{{ title }}</h1>
      <h4 v-if="!minimal">(Next 7 days)</h4>
    </div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="games">
      <GameLi
        v-for="game in games"
        :key="search ? game.game.id : game.game"
        :game="search ? game.game : game"
      />
    </ul>
  </div>
</template>

<script>
import GameLi from "@/components/GameLi";

export default {
  name: "GameList",
  props: {
    title: String,
    body: String,
    minimal: Boolean,
    search: Boolean
  },
  components: {
    GameLi
  },
  computed: {
    fetchUrl() {
      // this sets the correct endpoint for the api
      if (this.search) {
        return this.url + "/search";
      }
      return this.url + "/games";
    }
  },
  data() {
    return {
      loading: false,
      games: null,
      error: null,
      url: process.env.VUE_APP_API_URL
    };
  },
  created() {
    // fetch is done upon component creation
    this.fetchGames(this.fetchUrl, this.body);
  },
  watch: {
    // we watch for changes to the body prop
    // and fetch if from the api if it changes
    body() {
      this.game = this.fetchGames(this.fetchUrl, this.body);
    }
  },
  methods: {
    async fetchGames(url, bodyContent) {
      this.loading = true;
      try {
        const res = await fetch(url, {
          method: "POST",
          body: bodyContent
        });
        this.games = await res.json();
        this.loading = false;
        // TODO remove this when done
        console.log(this.games);
      } catch (error) {
        this.error = error;
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.gamelist {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  margin: 40px 0;
}
ul {
  list-style-type: none;
  padding: 5px 0;
  width: 100%;
}
</style>
