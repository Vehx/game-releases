<template>
  <div class="about">
    <h1>404 not found</h1>
    <p>
      <strong>Hail traveller,</strong>
      Looks like you took some mysterious portal let me take you
      <router-link :to="{ name: 'Home' }">
        home.
      </router-link>
    </p>
  </div>
</template>
