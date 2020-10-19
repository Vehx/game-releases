<template>
  <div>
    <h2>Game details POGGERS</h2>
    <p v-if="loading">
      Loading...
    </p>
    <p v-if="error"></p>
    <div v-if="game">
      <p>Current game id: {{ game.id }}</p>
      <p>Current game slug: {{ game.slug }}</p>
      <p>Current game name: {{ game.name }}</p>
      <p>
        Current game releases on:
        {{ new Intl.DateTimeFormat().format(game.first_release_date * 1000) }}
      </p>
      <p>Current game summary: {{ game.summary }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      game: null,
      error: null,
      url: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    }
  },
  created() {
    this.fetchGame();
  },
  methods: {
    async fetchGame() {
      this.loading = true;
      const url = process.env.VUE_APP_API_URL;

      try {
        const res = await fetch(url, {
          method: "POST",
          // add headers here if needed for authentication to aws proxy
          // headers: {
          //     "Accept": "application/json",
          //     "Client-ID": clientID,
          //     "Authorization": "Bearer " + token,
          // },
          body: `fields *, genres.name; where slug = "${this.slug}";`
        });
        const result = await res.json();
        this.game = result[0];
        console.log(this.game);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    }
  }
};
</script>
