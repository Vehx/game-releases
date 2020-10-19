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
#nav {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
}

#nav a.active-link {
  color: #42b983;
}
</style>
