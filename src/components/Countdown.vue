<template>
  <div class="countdown">
    <time :datetime="formatted">
      {{ formatted }}
    </time>
  </div>
</template>

<script>
// Countdown takes a unix timestamp in seconds and counts down from that number to zero
// showing days, hours, minutes and seconds while doing so
// once it reaches 0 it clears its interval and sits at 0
export default {
  name: "Countdown",
  props: {
    countdown: Number
  },
  computed: {
    formatted() {
      return `${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s`;
    },
    seconds() {
      return Math.floor(this.currentCountdownTime % 60);
    },
    minutes() {
      return Math.floor((this.currentCountdownTime / 60) % 60);
    },
    hours() {
      return Math.floor((this.currentCountdownTime / 60 / 60) % 24);
    },
    days() {
      return Math.floor(this.currentCountdownTime / 60 / 60 / 24);
    }
  },
  data() {
    return {
      timeInterval: null,
      currentCountdownTime: 0
    };
  },
  methods: {
    startCountdown() {
      this.currentCountdownTime = this.countdown;
      this.timeInterval = setInterval(() => {
        if (this.currentCountdownTime > 0) {
          this.currentCountdownTime -= 1;
        } else {
          this.clearTimeInterval();
        }
      }, 1000);
    },
    clearTimeInterval() {
      clearInterval(this.timeInterval);
    }
  },
  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    if (this.timeInterval != null) {
      this.clearTimeInterval();
    }
  }
};
</script>

<style scoped>
.countdown {
  font-weight: bold;
  font-size: 20px;
  margin: 5px 0;
}
</style>
