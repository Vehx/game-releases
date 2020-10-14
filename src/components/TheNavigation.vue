<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <!-- <router-link to="/details">Details</router-link> -->
  </nav>
</template>

<style scoped>
#nav {
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
