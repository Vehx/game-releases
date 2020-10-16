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
      {{ now }}
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
      return new Date().getTime();
    },
    countdown() {
      return this.release * 1000 - this.now;
    },
    isreleased() {
      return this.countdown <= this.release;
    }
  }
};
</script>

<style scoped>
h3 {
  color: var(--color-green);
}
li {
  margin: 5px 10px;
  padding: 5px;
  border: 1px solid var(--color-green);
  border-radius: 10px;
}
a {
  color: var(--color-green);
}
</style>
