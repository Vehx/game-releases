<template>
  <li class="gameli">
    <h3>
      {{ name }}
    </h3>
    <p>
      {{ name }} release{{ isReleased ? "d" : "s" }} on:
      {{ releaseDateString }}
    </p>
    <p>
      Releases in:
      {{ currentCountdownTime }}
      <!-- {{ formattedCountdown }} -->
    </p>
    <p>Debug numbers:</p>
    <p>Countdown: {{ countdown }}</p>
    <p>Now: {{ now }}</p>
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
    }
    // currentCountdownTime() {
    //   return this.countdown;
    // }
    // timer research link 1 https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f
  },
  data() {
    return {
      timeInterval: null,
      currentCountdownTime: 100
    };
  },
  methods: {
    startCountdown() {
      console.log(this.countdown, this.currentCountdownTime);
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
h3 {
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
