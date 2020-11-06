<template>
  <div class="switch">
    <img alt="Switch logo" src="@/assets/logos/logo-nintendo-switch.png" />
    <GameList title="Switch game releases: " :body="fetchBody" />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Switch",
  components: {
    GameList
  },
  data() {
    return {
      platformId: 130
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
