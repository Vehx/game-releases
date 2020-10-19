<template>
  <li class="gameli">
    <h2>
      {{ name }}
    </h2>
    <p>
      {{ name }} release{{ isReleased ? "d" : "s" }} on:
      {{ releaseDateString }}
    </p>
    <p>
      Releases in:
      {{ formattedCountdown }}
    </p>
    <router-link
      :to="{
        name: 'GameDetails',
        params: {
          id: id,
          slug: slug,
          name: name,
          release: release
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
    id: Number,
    slug: String,
    name: String,
    release: Number
  },

  computed: {
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    countdown() {
      return this.release - this.now;
    },
    isReleased() {
      return this.countdown <= 0;
    },
    releaseDateString() {
      return new Intl.DateTimeFormat().format(this.release * 1000);
    },
    formattedCountdown() {
      let seconds = Math.floor(this.currentCountdownTime % 60);
      let minutes = Math.floor((this.currentCountdownTime / 60) % 60);
      let hours = Math.floor((this.currentCountdownTime / 60 / 60) % 24);
      let days = Math.floor(this.currentCountdownTime / 60 / 60 / 24);
      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
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
