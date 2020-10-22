<template>
  <img class="platform-icon" :src="imgPath" :alt="alt" />
</template>

<script>
// @/assets/platforms/${platform.id}.png

export default {
  name: "PlatformIcon",
  props: {
    src: Number,
    alt: String
  },
  data() {
    return {
      // url: "@/assets/platforms/",
      url: "/img/platforms",
      fileEnding: ".png"
    };
  },
  computed: {
    imgPath() {
      // const path = `@/assets/platforms/${this.src}.png`;
      // return `@/assets/platforms/${this.src}.png`;
      // return path;
      return this.url + this.src + this.fileEnding;
    }
  }
};
</script>

<style scoped>
img {
  height: 35px;
  width: 35px;
}
</style>
