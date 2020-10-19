<template>
  <div class="gamelist">
    <h1>{{ title }}</h1>
    <p v-if="loading">Loading...{{ url }}</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="games">
      <GameLi
        v-for="game in games"
        :key="game.id"
        :id="game.id"
        :slug="game.slug"
        :name="game.name"
        :release="game.first_release_date"
      />
    </ul>
  </div>
</template>

<script>
// this is what cover.url will return in fetch
// //images.igdb.com/igdb/image/upload/t_thumb/co2dc0.jpg
// there is a rate limit of around 600 images per minute so caching would be great
import GameLi from "@/components/GameLi";

export default {
  name: "GameList",
  props: {
    title: String
  },
  components: {
    GameLi
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
    this.fetchGame();
  },
  methods: {
    async fetchGame() {
      this.loading = true;
      // changing url to only be the base url might be a good idea
      const url = process.env.VUE_APP_API_URL;
      const now = Math.floor(new Date().getTime() / 1000);

      try {
        const res = await fetch(url, {
          method: "POST",
          // add headers here if needed for authentication to aws proxy
          // headers: {
          //     "Accept": "application/json",
          //     "Client-ID": clientID,
          //     "Authorization": "Bearer " + token,
          // },
          // sending this in with a prop would make this a much more general component
          body: `fields *; sort first_release_date asc; where first_release_date > ${now}; limit 2;`
        });
        this.games = await res.json();
        console.log(this.games);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 5px 0;
  width: 100vw;
}
a {
  color: var(--color-green);
}
</style>
