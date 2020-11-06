<template>
  <div class="home">
    <img alt="Home logo" src="@/assets/logos/logo-home.png" />
    <div class="welcome">
      <p>Welcome to Game Releases,</p>
      <p>
        a site to get a quick overview of what <br />
        video games are releasing soon, <br />
        with countdowns.
      </p>
    </div>
    <GameList title="All game releases: " :body="fetchBody" />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Home",
  components: {
    GameList
  },
  computed: {
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    fetchBody() {
      // 604800 is the unix time stamp of 7 days, so this grabs all games releaseing in the next 7 days
      return `fields *, cover.image_id, genres.name, platforms.*, keywords.*; sort first_release_date asc;
             where first_release_date > ${this.now} & first_release_date <
             ${this.now + 604800};
             limit 50;`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  margin: 0 1rem;
  line-height: 1.3rem;
}
</style>
