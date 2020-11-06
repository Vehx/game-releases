<template>
  <div class="pc">
    <img alt="PC logo" src="@/assets/logos/logo-win-10.png" />
    <GameList title="PC game releases: " :body="fetchBody" />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Pc",
  components: {
    GameList
  },
  data() {
    return {
      platformId: 6
    };
  },
  computed: {
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    fetchBody() {
      return `fields *, cover.image_id, genres.name, platforms.*, keywords.*; sort first_release_date asc;
             where platforms = (${this.platformId}) &
             first_release_date > ${this.now} & first_release_date <
             ${this.now + 604800};
             limit 50;`;
    }
  }
};
</script>
