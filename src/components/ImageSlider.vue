<template>
  <div class="slider-wrapper">
    <div
      class="slider"
      ref="slider"
      @mousedown.capture="lock"
      @mouseup.capture="move"
      :style="`--i: ${currentIndex}; --slides: ${slides}`"
    >
      <div v-for="image in images" class="slide" :key="image.id">
        <img
          :src="`${imageUrl}t_screenshot_med/${image.image_id}.jpg`"
          :alt="image.name"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Object
  },
  computed: {
    slides() {
      return this.images.length;
    }
  },
  data() {
    return {
      x0: null,
      currentIndex: 0,
      imageUrl: process.env.VUE_APP_IMAGE_URL
    };
  },
  mounted() {
    this.$refs.slider.addEventListener("touchstart", this.lock, false);
    this.$refs.slider.addEventListener("touchend", this.move, false);
  },
  beforeUnmount() {
    this.$refs.slider.removeEventListener("touchstart", this.lock, false);
    this.$refs.slider.removeEventListener("touchend", this.move, false);
  },
  methods: {
    unify(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    },
    lock(e) {
      this.x0 = this.unify(e).clientX;
    },
    move(e) {
      if (this.x0 || this.x0 === 0) {
        let dx = this.unify(e).clientX - this.x0,
          s = Math.sign(dx);

        if (
          (this.currentIndex > 0 || s < 0) &&
          (this.currentIndex < this.slides - 1 || s > 0)
        ) {
          this.$refs.slider.style.setProperty("--i", (this.currentIndex -= s));
        }
      }
    }
  }
};
</script>

<style scoped>
.slider {
  /* number of slides, this is changed in js */
  --slides: 1;

  display: flex;
  align-items: center;
  height: 300px;
  width: 100%; /* fallback if calc isnt supported */
  width: calc(var(--slides) * 100%);
  overflow-y: hidden;
  overflow-x: hidden;

  transition: transform 0.5s ease-out;
  transform: translate(calc(var(--i, 0) / var(--slides) * -100%));
}
.slider-wrapper {
  max-width: 100vw;
  position: relative;
  overflow-x: hidden;
}
.slider .slide {
  /* needed for chrome */
  width: 100%;

  width: calc(100% / var(--slides));
  pointer-events: none;
}
.current-slide {
  background-color: #ffffff;
}
img {
  width: 100%;
}
</style>
