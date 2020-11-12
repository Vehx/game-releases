<template>
  <div v-for="video in videos" :key="video.id" class="aspect-ratio">
    <iframe
      :src="`https://www.youtube.com/embed/${video.video_id}`"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    videos: Object
  }
};
</script>

<style scoped>
.aspect-ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 51%;
}
iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
