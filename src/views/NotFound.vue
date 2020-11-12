<template>
  <div class="not-found">
    <h1><span>404</span> not found</h1>
    <p>
      <strong>Hail traveller,</strong><br />
      Looks like you took some mysterious portal let me take you
      <router-link :to="{ name: 'Home' }">
        home.
      </router-link>
    </p>
  </div>
</template>

<style scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
}
h1 {
  margin-bottom: 1rem;
}
span {
  color: var(--color-error);
}
a {
  font-weight: bold;
  color: var(--color-highlight);
}
</style>
