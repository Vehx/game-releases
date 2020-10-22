<template>
  <li class="gameli">
    <h2>{{ game.name }}</h2>
    <div class="gameli__wrapper">
      <img
        v-if="game.cover"
        :src="coverImage"
        :alt="'Game cover image of ' + game.name"
      />
      <div class="gameli__info">
        <p>
          {{ game.name }} release{{ isReleased ? "d" : "s" }} on:
          <time :datetime="releaseDateString">
            {{ releaseDateString }}
          </time>
        </p>
        <p>
          Releases in:
          <time :datetime="dataFormattedCountdown">
            {{ formattedCountdown }}
          </time>
        </p>
        <div v-if="game.platforms">
          <span>Platforms: </span>
          <PlatformIcon
            v-for="platform in game.platforms"
            :key="platform.id"
            :src="platform.id"
            :alt="platform.name"
          />
        </div>
        <div v-if="game.genres">
          Genres:
          <span
            v-for="genre in game.genres"
            :key="genre.id"
            class="gameli__genre"
          >
            {{ genre.name }}
          </span>
        </div>
      </div>
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
      Read more
    </router-link>
  </li>
</template>

<script>
import PlatformIcon from "@/components/PlatformIcon";

export default {
  name: "GameList",
  props: {
    game: Object
  },
  components: {
    PlatformIcon
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
    formattedCountdown() {
      return `${this.countdownDays} days, ${this.countdownHours} hours, ${this.countdownMinutes} minutes, ${this.countdownSeconds} seconds`;
    },
    dataFormattedCountdown() {
      return `${this.countdownDays}d ${this.countdownHours}h ${this.countdownMinutes}m ${this.countdownSeconds}s`;
    },
    countdownSeconds() {
      return Math.floor(this.currentCountdownTime % 60);
    },
    countdownMinutes() {
      return Math.floor((this.currentCountdownTime / 60) % 60);
    },
    countdownHours() {
      return Math.floor((this.currentCountdownTime / 60 / 60) % 24);
    },
    countdownDays() {
      return Math.floor(this.currentCountdownTime / 60 / 60 / 24);
    },
    coverImage() {
      return `${process.env.VUE_APP_IMAGE_URL}t_cover_small/${this.game.cover.image_id}.jpg`;
    }
  },
  data() {
    return {
      timeInterval: null,
      currentCountdownTime: null
    };
  },
  methods: {
    startCountdown() {
      this.currentCountdownTime = this.countdown;
      this.timeInterval = setInterval(
        () => (this.currentCountdownTime -= 1),
        1000
      );
    },
    clearTimeInterval() {
      clearInterval(this.timeInterval);
    }
  },
  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    this.clearTimeInterval();
  }
};
</script>

<style scoped>
h2 {
  color: var(--color-green);
}
li {
  max-width: 100%;
  margin: 5px 10px;
  padding: 5px;
  border: 1px solid var(--color-green);
  border-radius: 10px;
}
a {
  color: var(--color-green);
}
</style>
