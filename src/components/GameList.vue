<template>
  <div class="gamelist">
    <h1>{{ title }}</h1>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="games">
      <GameLi v-for="game in games" :key="game.id" :game="game" />
    </ul>
  </div>
</template>

<script>
// this is what cover.url will return in fetch
// //images.igdb.com/igdb/image/upload/t_thumb/co2dc0.jpg
// now using just the image id, co2dc0, from above and base url is in env
// t_thumb part is not in base url and can be set to what is wanted, like t_cover_small
// there is a rate limit of around 600 images per minute so caching would be great
import GameLi from "@/components/GameLi";

export default {
  name: "GameList",
  props: {
    title: String,
    platform: Number
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
          // 604800 is the unix time stamp of 7 days, so this grabs all games releaseing in the next 7 days
          body: `fields *, cover.image_id, genres.name, platforms.*, keywords.*; sort first_release_date asc; where ${
            this.platform ? `platforms = (${this.platform}) &` : ""
          } first_release_date > ${now} & first_release_date < ${now +
            604800}; limit 50;`
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
.gamelist {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  margin: 40px 0;
}
ul {
  list-style-type: none;
  padding: 5px 0;
  width: 100%;
}
a {
  color: var(--color-green);
}
</style>
