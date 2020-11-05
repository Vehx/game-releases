<template>
  <div class="search">
    <h1>Search page</h1>
    <h2>Under construction</h2>
    <label for="search">Search</label>
    <input type="text" v-model.lazy="searchTerm" name="search" id="search" />
    <p>Search term: {{ searchTerm }}</p>
    <p>Page url: {{ $route.path }}</p>
    <GameList
      v-if="searchTerm"
      title="Search results: "
      minimal
      search
      :body="fetchBody"
    />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Search",
  components: {
    GameList
  },
  data() {
    return {
      searchTerm: ""
    };
  },
  computed: {
    fetchBody() {
      return `fields game.*, game.cover.image_id, game.genres.name, game.platforms.*, game.keywords.*;
       where game.name ~ *"${this.searchTerm}"*;
       limit 25;`;
    }
  },
  methods: {
    prefilledSearchTerm() {
      if (this.$route.query) {
        this.searchTerm = this.$route.query;
      }
      this.searchTerm = "";
    }
  },
  created() {
    this.prefilledSearchTerm();
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
