<template>
  <div class="search">
    <img alt="Search logo" src="@/assets/logos/logo-search.png" />
    <h2>Search game name</h2>
    <div>
      <label for="search">Search</label>
      <input
        type="text"
        v-model.lazy="searchTerm"
        name="search"
        id="search"
        placeholder="Enter search here"
      />
    </div>
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
        this.searchTerm = this.$route.query.s;
      }
    }
  },
  created() {
    this.prefilledSearchTerm();
  },
  watch: {
    searchTerm() {
      // change to push for better navigation
      // push does not load the gamelist properly so sticking to replace for now
      this.$router.replace({ name: "Search", query: { s: this.searchTerm } });
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 2rem;
}
</style>
