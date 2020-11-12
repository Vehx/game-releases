<template>
  <div class="xbox">
    <img alt="Xbox logo" src="@/assets/logos/logo-xbox-one.png" />
    <GameList title="Xbox game releases: " :body="fetchBody" />
  </div>
</template>

<script>
import GameList from "@/components/GameList.vue";

export default {
  name: "Xbox",
  components: {
    GameList
  },
  data() {
    return {
      // xbox one 49
      // xbox series 169
      platformId: 49
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

<style scoped>
.xbox {
  width: 100%;
}
</style>
