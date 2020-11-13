<template>
  <div class="wrapper">
    <p v-if="loading" class="loading">
      Loading...
    </p>
    <p v-if="error"></p>
    <div v-if="game">
      <h1>{{ game.name }}</h1>
      <div class="countdown-wrapper">
        <Countdown :countdown="countdown" />
      </div>
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
          <span v-else><TagItem tag="N/A" faded/></span>
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
          <span v-else><TagItem tag="N/A" faded/></span>
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
          <span v-else><TagItem tag="N/A" faded/></span>
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
          <span v-else><TagItem tag="N/A" faded/></span>
        </div>
        <div class="themes">
          <h3>
            Themes:
          </h3>
          <span v-if="game.themes">
            <TagItem
              v-for="theme in game.themes"
              :key="theme.id"
              :tag="theme.name"
            />
          </span>
          <span v-else><TagItem tag="N/A" faded/></span>
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
          <span v-else><TagItem tag="N/A" faded/></span>
        </div>
        <CompaniesList :list="game.involved_companies" />
        <ReleaseDateList
          v-if="game.release_dates"
          :dates="game.release_dates"
        />
      </div>
      <div v-if="game.screenshots" class="screenshots">
        <ImageSlider :images="game.screenshots" />
      </div>
      <div v-if="game.videos" class="videos">
        <VideoList :videos="game.videos" />
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
import CompaniesList from "@/components/CompaniesList";
import ImageSlider from "@/components/ImageSlider";
import VideoList from "@/components/VideoList";

export default {
  components: {
    Countdown,
    TagItem,
    ReleaseDateList,
    ExternalLinkList,
    CompaniesList,
    ImageSlider,
    VideoList
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
      return this.game.first_release_date
        ? this.game.first_release_date - this.now
        : 0;
    },
    isReleased() {
      return this.countdown <= 0;
    },
    releaseDateString() {
      return this.game.first_release_date
        ? new Intl.DateTimeFormat().format(this.game.first_release_date * 1000)
        : "TBA";
    },
    coverImage() {
      return `${this.imageUrl}t_cover_big/${this.game.cover.image_id}.jpg`;
    }
  },
  created() {
    this.fetchGame();
  },
  methods: {
    setTitle() {
      document.title = `${this.game.name} | Game Releases`;
    },
    async fetchGame() {
      this.loading = true;
      const url = process.env.VUE_APP_API_URL + "/games";

      try {
        const res = await fetch(url, {
          method: "POST",
          body: `
          fields name,
          first_release_date,
          cover.image_id,
          game_modes.name,
          genres.name,
          involved_companies.*,
          involved_companies.company.*,
          involved_companies.company.websites.*,
          platforms.name,
          player_perspectives.name,
          release_dates.date,
          release_dates.platform.name,
          release_dates.region,
          screenshots.*,
          storyline,
          summary,
          keywords.name,
          multiplayer_modes.*,
          themes.name,
          videos.*,
          websites.category,
          websites.url;
          where slug = "${this.slug}";`
        });
        const result = await res.json();
        this.game = result[0];
        this.loading = false;
        this.setTitle();
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
  padding: 0 1rem;
}
h1,
h3 {
  color: var(--color-highlight);
}
.wrapper {
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  margin-bottom: 10rem;
}
.loading {
  min-width: 100%;
  min-height: 100%;
  text-align: center;
}
.countdown-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.countdown {
  min-width: 240px;
}
.cover {
  height: 374px;
  min-width: 264px;
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
.summary h3,
.storyline h3 {
  margin-bottom: 0.5rem;
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
.screenshots {
  padding: 0;
}
.videos {
  margin-top: 0.8rem;
}
</style>
