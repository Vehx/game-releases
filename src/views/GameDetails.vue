<template>
  <div>
    <p v-if="loading">
      Loading...
    </p>
    <p v-if="error"></p>
    <div v-if="game">
      <h1>{{ game.name }}</h1>
      <Countdown :countdown="countdown" />
      <div class="cover">
        <img
          v-if="game.cover"
          :src="coverImage"
          :alt="'Game cover image of ' + game.name"
        />
      </div>
      <p>
        Release date:
        <span class="date">
          {{ releaseDateString }}
        </span>
      </p>
      <p v-if="game.summary" class="summary">Summary: {{ game.summary }}</p>
      <p v-if="game.storyline" class="storyline">
        Storyline: {{ game.storyline }}
      </p>
      <div v-if="game.platforms" class="platforms">
        Platforms:
        <PlatformIcon
          v-for="platform in game.platforms"
          :key="platform.id"
          :src="platform.id"
          :alt="platform.name"
        />
      </div>
      <div class="genres">
        Genres:
        <span v-if="game.genres">
          <div v-for="genre in game.genres" :key="genre.id" class="genre">
            {{ genre.name }}
          </div>
        </span>
        <span v-else>N/A</span>
      </div>
      <div class="modes">
        Game modes:
        <span v-if="game.game_modes">
          <div v-for="modes in game.game_modes" :key="modes.id" class="mode">
            {{ modes.name }}
          </div>
        </span>
        <span v-else>N/A</span>
      </div>
      <div class="tags">
        Tags:
        <span v-if="game.keywords">
          <div v-for="keyword in game.keywords" :key="keyword.id" class="tag">
            {{ keyword.name }}
          </div>
        </span>
        <span v-else>N/A</span>
      </div>
      <div v-if="game.screenshots" class="screenshot">
        <!-- this works just using one for testing -->
        <!-- <img
          v-for="screenshot in game.screenshots"
          :key="screenshot.id"
          :src="`${imageUrl}t_screenshot_med/${screenshot.image_id}.jpg`"
          :alt="screenshot.name"
        /> -->
        <img
          :src="
            `${imageUrl}t_screenshot_med/${game.screenshots[0].image_id}.jpg`
          "
          :alt="game.screenshots[0].name"
        />
      </div>
      <div v-if="game.videos" class="videos">
        <!-- this works just using one for testing -->
        <!-- <iframe
          v-for="video in game.videos"
          :key="video.id"
          :width="windowWidth"
          height="315"
          :src="`https://www.youtube.com/embed/${video.video_id}`"
          frameborder="0"
          allowfullscreen
        ></iframe> -->
        <iframe
          :width="windowWidth"
          height="315"
          :src="`https://www.youtube.com/embed/${game.videos[0].video_id}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div v-if="game.websites" class="links">
        External website links:
        <ul v-for="link in game.websites" :key="link.id">
          <li>
            <a class="link" :href="link.url" target="_blank" norel noopener>
              {{ link.url }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import PlatformIcon from "@/components/PlatformIcon";
import Countdown from "@/components/Countdown";

export default {
  components: {
    PlatformIcon,
    Countdown
  },
  data() {
    return {
      loading: false,
      game: null,
      error: null,
      url: process.env.VUE_APP_API_URL,
      imageUrl: process.env.VUE_APP_IMAGE_URL,
      windowWidth: window.innerWidth - 20
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    now() {
      return Math.floor(new Date().getTime() / 1000);
    },
    countdown() {
      return this.game.first_release_date - this.now;
    },
    isReleased() {
      return this.countdown <= 0;
    },
    releaseDateString() {
      return new Intl.DateTimeFormat().format(
        this.game.first_release_date * 1000
      );
    },
    coverImage() {
      return `${this.imageUrl}t_cover_small/${this.game.cover.image_id}.jpg`;
    }
  },
  created() {
    this.fetchGame();
  },
  methods: {
    async fetchGame() {
      this.loading = true;
      const url = process.env.VUE_APP_API_URL;

      try {
        const res = await fetch(url, {
          method: "POST",
          // add headers here if needed for authentication to aws proxy
          // headers: {
          //     "Accept": "application/json",
          //     "Client-ID": clientID,
          //     "Authorization": "Bearer " + token,
          // },
          body: `fields *, cover.image_id, game_modes.name, genres.name, platforms.name, player_perspectives.name, release_dates.*, screenshots.*, keywords.name, themes.*, videos.*, websites.*; where slug = "${this.slug}";`
        });
        const result = await res.json();
        this.game = result[0];
        console.log(this.game);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error;
      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: var(--color-highlight);
}
.wrapper {
  padding: 5px;
  display: flex;
}
.cover {
  height: 128px;
  min-width: 90px;
  align-self: flex-start;
}
.info {
  padding: 0 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.date {
  font-weight: bold;
}
.platforms {
  margin: 5px 0;
}
.genre,
.mode,
.tag {
  display: inline-block;
  border: 1px solid var(--color-highlight);
  border-radius: 5px;
  background-color: var(--color-highlight);
  margin-right: 5px;
  padding: 0 2px;
  color: var(--color-background-main);
}
img {
  max-width: 100%;
}
a {
  font-weight: bold;
  color: var(--color-highlight);
  margin-top: 5px;
}
</style>
