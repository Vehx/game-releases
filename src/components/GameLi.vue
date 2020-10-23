<template>
  <li>
    <h2>{{ game.name }}</h2>
    <Countdown :key="game.id" :countdown="countdown" />
    <div class="wrapper">
      <div class="cover">
        <img
          v-if="game.cover"
          :src="coverImage"
          :alt="'Game cover image of ' + game.name"
        />
      </div>
      <div class="info">
        <p class="release">
          <!-- {{ game.name }} release{{ isReleased ? "d" : "s" }}: -->
          Release date:
          <time class="date" :datetime="releaseDateString">
            {{ releaseDateString }}
          </time>
        </p>
        <div v-if="game.platforms" class="platforms">
          Platforms:
          <PlatformIcon
            v-for="platform in game.platforms"
            :key="platform.id"
            :src="platform.id"
            :alt="platform.name"
          />
        </div>
        <div>
          Genres:
          <span v-if="game.genres">
            <div v-for="genre in game.genres" :key="genre.id" class="genre">
              {{ genre.name }}
            </div>
          </span>
          <span v-else>N/A</span>
        </div>
        <router-link
          :to="{
            name: 'GameDetails',
            params: {
              id: game.id,
              slug: game.slug,
              name: game.name,
              release: game.first_release_date
            }
          }"
        >
          Learn more
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
import PlatformIcon from "@/components/PlatformIcon";
import Countdown from "@/components/Countdown";

export default {
  name: "GameList",
  props: {
    game: Object
  },
  components: {
    PlatformIcon,
    Countdown
  },
  computed: {
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    countdown() {
      return this.game.first_release_date - this.now;
    },
    isReleased() {
      return this.countdown <= 0;
    },
    releaseDateString() {
      return new Intl.DateTimeFormat().format(
        this.game.first_release_date * 1000
      );
    },
    coverImage() {
      return `${process.env.VUE_APP_IMAGE_URL}t_cover_small/${this.game.cover.image_id}.jpg`;
    }
  }
};
</script>

<style scoped>
li {
  max-width: 100%;
  margin: 5px 10px;
  padding: 5px;
  border: 1px solid var(--color-highlight);
  border-radius: 10px;
}
h2 {
  color: var(--color-highlight);
}
.wrapper {
  padding: 5px;
  display: flex;
}
.cover {
  height: 128px;
  min-width: 90px;
  align-self: flex-start;
}
.info {
  padding: 0 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.date {
  font-weight: bold;
}
.platforms {
  margin: 5px 0;
}
.genre {
  display: inline-block;
  border: 1px solid var(--color-highlight);
  border-radius: 5px;
  background-color: var(--color-highlight);
  margin-right: 5px;
  padding: 0 2px;
  color: var(--color-background-main);
}
a {
  font-weight: bold;
  color: var(--color-highlight);
  margin-top: 5px;
}
</style>
