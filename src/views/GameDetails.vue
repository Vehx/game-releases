<template>
  <div class="wrapper">
    <p v-if="loading" class="loading">
      Loading...
    </p>
    <p v-if="error"></p>
    <div v-if="game">
      <h1>{{ game.name }}</h1>
      <Countdown :countdown="countdown" />
      <div v-if="game.cover" class="cover">
        <img :src="coverImage" :alt="'Game cover image of ' + game.name" />
      </div>
      <div class="release-date">
        <h3>
          Release date:
        </h3>
        <p class="date">
          {{ releaseDateString }}
        </p>
      </div>
      <div v-if="game.summary" class="summary">
        <h3>
          Summary:
        </h3>
        <p>
          {{ game.summary }}
        </p>
      </div>
      <div v-if="game.storyline" class="storyline">
        <h3>
          Storyline:
        </h3>
        <p>
          {{ game.storyline }}
        </p>
      </div>
      <div class="info">
        <h3 class="info-title">Game info:</h3>
        <div class="platforms">
          <h3>
            Platforms:
          </h3>
          <span v-if="game.platforms">
            <TagItem
              v-for="platform in game.platforms"
              :key="platform.id"
              :tag="platform.name"
            />
          </span>
          <span v-else>TBA</span>
        </div>
        <div class="genres">
          <h3>
            Genres:
          </h3>
          <span v-if="game.genres">
            <TagItem
              v-for="genre in game.genres"
              :key="genre.id"
              :tag="genre.name"
            />
          </span>
          <span v-else>N/A</span>
        </div>
        <div class="modes">
          <h3>
            Game modes:
          </h3>
          <span v-if="game.game_modes">
            <TagItem
              v-for="mode in game.game_modes"
              :key="mode.id"
              :tag="mode.name"
            />
          </span>
          <span v-else>N/A</span>
        </div>
        <div class="player-perspectives">
          <h3>
            Player prespectives:
          </h3>
          <span v-if="game.player_perspectives">
            <TagItem
              v-for="prespective in game.player_perspectives"
              :key="prespective.id"
              :tag="prespective.name"
            />
          </span>
          <span v-else>N/A</span>
        </div>
        <div v-if="game.themes" class="themes">
          <h3>
            Themes:
          </h3>
          <span>
            <TagItem
              v-for="theme in game.themes"
              :key="theme.id"
              :tag="theme.name"
            />
          </span>
        </div>
        <div class="keywords">
          <h3>
            Tags:
          </h3>
          <span v-if="game.keywords">
            <TagItem
              v-for="keyword in game.keywords"
              :key="keyword.id"
              :tag="keyword.name"
            />
          </span>
          <span v-else>N/A</span>
        </div>
        <ReleaseDateList
          v-if="game.release_dates"
          :dates="game.release_dates"
        />
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
          loading="lazy"
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
      <ExternalLinkList v-if="game.websites" :links="game.websites" />
    </div>
  </div>
</template>
<script>
import Countdown from "@/components/Countdown";
import TagItem from "@/components/TagItem";
import ReleaseDateList from "@/components/ReleaseDateList";
import ExternalLinkList from "@/components/ExternalLinkList";

export default {
  components: {
    Countdown,
    TagItem,
    ReleaseDateList,
    ExternalLinkList
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
          body: `fields name, first_release_date, cover.image_id, game_modes.name, genres.name, platforms.name, player_perspectives.name, release_dates.date, release_dates.platform.name, release_dates.region, screenshots.*, keywords.name, multiplayer_modes.*, themes.name, videos.*, websites.category, websites.url; where slug = "${this.slug}";`
        });
        const result = await res.json();
        this.game = result[0];
        console.log(this.game);
        console.log(this.game.websites);
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
h1,
h3 {
  color: var(--color-highlight);
}
.wrapper {
  display: flex;
}
.loading {
  min-width: 100%;
  min-height: 100%;
  text-align: center;
}
.cover {
  height: 128px;
  min-width: 90px;
  align-self: flex-start;
}
.release-date {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
}
.date {
  margin-left: 5px;
  font-weight: bold;
  font-size: 18.72px;
}
.summary,
.storyline {
  padding: 0 1rem;
  margin: 0.8rem 0;
}
.info {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0.5rem 0;
}
.info .info-title {
  color: var(--color-highlight);
  text-align: center;
}
.info h3 {
  display: inline;
  color: var(--color-normal);
}
.info > div {
  margin: 0.2rem 0.2rem;
  padding: 0 1rem;
}
.release-dates,
.screenshot {
  padding: 0;
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
