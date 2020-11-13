<template>
  <li>
    <h2>{{ game.name }}</h2>
    <Countdown class="countdown" :key="game.id" :countdown="countdown" />
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
        <div class="platforms">
          Platforms:
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
          Genres:
          <span v-if="game.genres">
            <TagItem
              v-for="genre in game.genres"
              :key="genre.id"
              :tag="genre.name"
            />
          </span>
          <span v-else><TagItem tag="N/A" faded/></span>
        </div>
        <div class="buttons">
          <button v-if="isSaved" @click="removeFromWatchList" class="remove">
            Remove from Watch list
          </button>
          <button v-else @click="addToWatchList">Add to Watch list</button>
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
    releaseDateString() {
      if (this.game.first_release_date) {
        return new Intl.DateTimeFormat().format(
          this.game.first_release_date * 1000
        );
      }
      return "TBA";
    },
    coverImage() {
      // this is what cover.url will return in fetch
      // //images.igdb.com/igdb/image/upload/t_thumb/co2dc0.jpg
      // now using just the image id, co2dc0, from above and base url is in env
      // t_thumb part is not in base url and can be set to what is wanted, like t_cover_small
      // there is a rate limit of around 600 images per minute so caching would be great
      return `${process.env.VUE_APP_IMAGE_URL}t_cover_small/${this.game.cover.image_id}.jpg`;
    }
  },
  data() {
    return {
      isSaved: false
    };
  },
  created() {
    this.checkIfSaved();
  },
  methods: {
    addToWatchList() {
      // if watchlist exists in local storage we add to it
      // if it does not we create it
      if (localStorage.getItem("watchlist")) {
        let currentStorage = localStorage.getItem("watchlist");
        localStorage.setItem(
          "watchlist",
          (currentStorage += `,${this.game.id}`)
        );
      } else {
        localStorage.setItem("watchlist", this.game.id);
      }
      this.isSaved = true;
    },
    removeFromWatchList() {
      // we get watchlist from local storage and split it into an array
      let currentStorage = localStorage.getItem("watchlist");
      let storageArray = currentStorage.split(",");
      // grab the id of game id we want to remove and remove it
      storageArray.splice(storageArray.indexOf(this.game.id), 1);
      // if it was the last game id in watchlist we also remove watchlist from local storage
      if (storageArray.length < 1) {
        localStorage.removeItem("watchlist");
      } else {
        // otherwise we put the remaining game ids back into local storage
        currentStorage = storageArray.toString();
        localStorage.setItem("watchlist", currentStorage);
      }
      this.isSaved = false;
    },
    checkIfSaved() {
      // checks if game exists in watchlist
      if (localStorage.getItem("watchlist")) {
        this.isSaved = localStorage.getItem("watchlist").includes(this.game.id);
      } else {
        this.isSaved = false;
      }
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
  padding: 1rem 0.5rem;
  border: 2px solid var(--color-highlight);
  border-radius: 10px;
}
h2 {
  color: var(--color-highlight);
}
.countdown {
  font-size: 24px;
}
.wrapper {
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
  padding-left: 0.4rem;
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
.buttons {
  display: flex;
  flex-direction: column;
  margin-top: 0.7rem;
}
button {
  margin-bottom: 0.7rem;
  border: 2px solid var(--color-highlight);
  border-radius: 5px;
  padding: 0.1rem 0.3rem;
  font-weight: bold;
  cursor: pointer;
  background-color: var(--color-highlight);
}
.remove {
  background-color: var(--color-disabled);
}
a {
  font-weight: bold;
  color: var(--color-highlight);
}
@media (min-width: 768px) {
  li {
    max-width: 750px;
    width: 75%;
  }
  .wrapper {
    width: 500px;
  }
}
</style>
