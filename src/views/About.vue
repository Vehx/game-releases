<template>
  <div class="about">
    <h1>
      About <br />
      Game Releases
    </h1>
    <h3>This site is under construction :)</h3>
    <p class="tiny">please excuse the noise</p>
    <p>
      When it's done it will show game releases of the coming week.
    </p>
    <p>
      There will also be a search so you can find a game you're looking forward
      to.
    </p>
    <p>
      And a watchlist that you can add games to and keep track of. (Only saved
      locally)
    </p>
    <p>Ominous test timer.. very spooky</p>
    <Countdown :countdown="20" class="countdown" />
  </div>
</template>

<script>
import Countdown from "@/components/Countdown";

export default {
  components: {
    Countdown
  }
};
</script>

<style scoped>
.about {
  padding: 0 1.5rem;
}
h1 {
  margin: 2rem;
}
.tiny {
  font-size: 10px;
}
p {
  margin-bottom: 1rem;
}
.countdown {
  color: red;
  font-size: 30px;
  font-weight: 100;
}
</style>
