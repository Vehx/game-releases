<template>
  <div class="gamelist">
    <h1>{{ title }}</h1>
    <ul>
      <p v-if="loading">Loading...{{ url }}</p>
      <p v-if="error">{{ error }}</p>
      <GameLi
        v-if="game"
        :id="game[0].id"
        :slug="game[0].slug"
        :name="game[0].name"
        :release="game[0].first_release_date"
      />
    </ul>
  </div>
</template>

<script>
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
      game: null,
      error: null,
      //   token: process.env.VUE_APP_API_ACCESS_TOKEN
      //   id: process.env.VUE_APP_API_CLIENT_ID
      url: process.env.VUE_APP_API_URL
    };
  },
  created() {
    this.fetchGame();
  },
  methods: {
    async fetchGame() {
      this.loading = true;
      const url = process.env.VUE_APP_API_URL;
      // const clientID = process.env.VUE_APP_API_CLIENT_ID;
      // const token = process.env.VUE_APP_API_ACCESS_TOKEN;
      // console.log(process.env.VUE_APP_API_URL);
      // console.log(process.env.VUE_APP_API_CLIENT_ID);
      // console.log(process.env.VUE_APP_API_ACCESS_TOKEN);

      try {
        // const res = await fetch('https://api.kanye.rest')
        const res = await fetch(url, {
          method: "POST",
          // headers: {
          //     "Accept": "application/json",
          //     "Client-ID": clientID,
          //     "Authorization": "Bearer " + token,
          // },
          body: "fields *; limit 1;"
        });
        this.game = await res.json();
        console.log(this.game);
        console.log(this.game[0].name);
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
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
