<template>
  <li>
    <h2>{{ game.name }}</h2>
    <div class="countdown">
      <span v-if="!isReleased">
        <Countdown :key="game.id" :countdown="countdown" />
      </span>
      <span v-else>Released</span>
    </div>

    <div class="wrapper">
      <div class="cover">
        <img
          v-if="game.cover"
          :src="coverImage"
          :alt="'Game cover image of ' + game.name"
        />
      </div>
      <div class="info">
        <p class="release">
          Release date:
          <time class="date" :datetime="releaseDateString">
            {{ releaseDateString }}
          </time>
        </p>
        <div v-if="game.platforms" class="platforms">
          Platforms:
          <TagItem
            v-for="platform in game.platforms"
            :key="platform.id"
            :tag="platform.name"
          />
        </div>
        <div class="genres">
          Genres:
          <span v-if="game.genres">
            <TagItem
              v-for="genre in game.genres"
              :key="genre.id"
              :tag="genre.name"
            />
          </span>
          <span v-else>N/A</span>
        </div>
        <router-link
          :to="{
            name: 'GameDetails',
            params: {
              id: game.id,
              slug: game.slug
            }
          }"
        >
          Learn more
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
import TagItem from "@/components/TagItem";
import Countdown from "@/components/Countdown";

export default {
  name: "GameList",
  props: {
    game: Object
  },
  components: {
    TagItem,
    Countdown
  },
  computed: {
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    countdown() {
      return isNaN(this.game.first_release_date)
        ? 0
        : this.game.first_release_date - this.now;
    },
    isReleased() {
      return this.countdown <= 0;
    },
    releaseDateString() {
      let date;
      if (this.game.first_release_date) {
        date = new Intl.DateTimeFormat().format(
          this.game.first_release_date * 1000
        );
      } else {
        date = "TBA";
      }
      return date;
    },
    coverImage() {
      return `${process.env.VUE_APP_IMAGE_URL}t_cover_small/${this.game.cover.image_id}.jpg`;
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin: 0.5rem 0.6rem;
  padding: 0.5rem;
  border: 1px solid var(--color-highlight);
  border-radius: 10px;
}
h2 {
  color: var(--color-highlight);
}
.countdown {
  font-size: 24px;
}
.wrapper {
  padding: 0.4rem;
  display: flex;
  max-width: 500px;
}
.cover {
  height: 128px;
  min-width: 90px;
  align-self: flex-start;
}
.info {
  min-width: 235px;
  padding: 0 0.4rem 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.release {
  margin-bottom: 0.2rem;
}
.date {
  font-weight: bold;
}
.platforms,
.genres {
  margin: 0.2rem 0 0 0;
}
a {
  font-weight: bold;
  color: var(--color-highlight);
  margin-top: 0.4rem;
}
</style>
