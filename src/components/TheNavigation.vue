<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/pc">PC</router-link>
    <router-link to="/playstation">Playstation</router-link>
    <router-link to="/xbox">Xbox</router-link>
    <router-link to="/switch">Switch</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<style scoped>
/* temp styling before making hamburger menu */
#nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
}

a {
  font-weight: bold;
  color: var(--color-normal);
}

a.active-link {
  color: var(--color-highlight);
}
</style>
