<template>
  <div>
    <h3>External links:</h3>
    <ul v-if="links" class="external-link-list">
      <li v-for="link in links" :key="link.id">
        <a :href="link.url" rel="noopener nofollow" target="_blank">
          <span>{{ getLinkCategoryString(link.category) }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ExtarnalLinkList",
  props: {
    links: Object
  },
  methods: {
    getLinkCategoryString(categoryEnum) {
      switch (categoryEnum) {
        case 1:
          return "Official";
        case 2:
          return "Wikia";
        case 3:
          return "Wikipedia";
        case 4:
          return "Facebook";
        case 5:
          return "Twitter";
        case 6:
          return "Twitch";
        case 8:
          return "Instagram";
        case 9:
          return "Youtube";
        case 10:
          return "iPhone";
        case 11:
          return "iPad";
        case 12:
          return "Android";
        case 13:
          return "Steam";
        case 14:
          return "Reddit";
        case 15:
          return "Itch";
        case 16:
          return "Epicgames";
        case 17:
          return "Gog";
        case 18:
          return "Discord";
        default:
          return "Link";
      }
    },
    getIconPath(category) {
      return require(`@/assets/platforms/${category}.png`);
    }
  }
};
</script>

<style scoped>
div {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
}
ul {
  list-style: none;
  text-align: left;
}
a {
  font-weight: bold;
  color: var(--color-highlight);
  margin-top: 5px;
}
</style>
