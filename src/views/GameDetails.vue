<template>
  <div>
    <h2>Game details POGGERS</h2>
    <p>Current game id: {{ game.id }}</p>
    <p>Current game slug: {{ game.slug }}</p>
    <p>Current game name: {{ game.name }}</p>
    <p>
      Current game releases on:
      {{ new Intl.DateTimeFormat().format(game.release * 1000) }}
    </p>
    <p>Current game summary: {{ game.summary }}</p>
  </div>
</template>
<script>
export default {
  computed: {
    game() {
      let game = {};
      // check if params where sent, if not fetch from api
      if (this.$route.params.name === undefined) {
        // do the fetching
        // TODO
        game.id = 123;
        game.slug = "testname";
        game.name = "Testname";
        game.release = 12345;
        game.summary = "testname summary";
      } else {
        game = this.$route.params;
        // not very type safe, looking for better solution
        game.release = parseInt(game.release);
        game.id = parseInt(game.id);
      }
      console.log(game);
      return game;
    }
  }
};
</script>
