<template>
  <div class="search">
    <h1>Search page</h1>
    <h2>Under construction</h2>
    <label for="search">Search</label>
    <input type="text" v-model.lazy="searchTerm" name="search" id="search" />
    <p>Search term: {{ searchTerm }}</p>
    <GameList
      v-if="searchTerm"
      title="Search results: "
      search
      :searchTerm="searchTerm"
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
  }
};

// search fields:
// fields game.*; where game.name ~ *"search"*; limit 25;
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
