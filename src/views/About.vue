<template>
  <div class="about">
    <h1>
      About <br />
      Game Releases
    </h1>
    <p>
      Game releases is a site that give you a quick overview of the games that
      are coming out in the next 7days.
    </p>
    <p>
      It grabs the game information from one of the largest and hopefully most
      up to date API's out there.
    </p>
    <p>You can search for games by name on the search page.</p>
    <p>
      Add games to your watch list to keep track of them. It saves the game id's
      locally and gets their info, from the API, when you visit the watch list
      page.
    </p>
    <p>
      It was made by me
      <a
        href="https://github.com/Vehx/game-releases"
        rel="noopener nofollow"
        target="_blank"
        >Vehx</a
      >
    </p>
    <p>I hope you enjoy it!</p>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
}
h1 {
  color: var(--color-highlight);
  margin: 2rem;
}
p {
  padding: 0 1rem 1rem;
}
a {
  font-weight: bold;
  color: var(--color-highlight);
  margin-top: 5px;
}
@media (min-width: 768px) {
  p {
    padding: 0 5rem 2rem;
  }
}
</style>
