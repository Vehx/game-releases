<template>
  <li class="gameli">
    <h3>
      {{ name }}
    </h3>
    <p v-if="isreleased">
      {{ name }} released on:
      {{ new Intl.DateTimeFormat().format(release * 1000) }}
    </p>
    <p v-else>
      {{ name }} releases in:
      {{ countdown }}
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
    title: String,
    id: Number,
    slug: String,
    name: String,
    release: Number
  },
  computed: {
    countdown: new Date() - this.release * 1000,
    isreleased: this.countdown <= 0
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
  color: red;
}
li {
  margin: 5px 10px;
  padding: 5px;
}
a {
  color: #42b983;
}
</style>
