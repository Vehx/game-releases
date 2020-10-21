<template>
  <li class="gameli">
    <h2>{{ game.name }}</h2>
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
    <img
      v-if="game.cover != undefined"
      :src="coverImage"
      :alt="'Game cover of ' + game.name"
    />
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
export default {
  name: "GameList",
  props: {
    game: Object
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
