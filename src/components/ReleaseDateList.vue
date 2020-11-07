<template>
  <ul v-if="dates" class="release-dates">
    <li class="title">
      <h3>
        All release dates
      </h3>
    </li>
    <li>
      <span class="platform">Platform</span><span class="date">Date</span
      ><span>Region</span>
    </li>
    <li v-for="date in dates" :key="date.id">
      <span class="platform">
        {{ date.platform.name }}
      </span>
      <span class="date">{{
        date.date ? foramttedDate(date.date) : "TBA"
      }}</span>
      <span>
        {{ getRegionString(date.region) }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ReleaseDateList",
  props: {
    dates: Object
  },
  methods: {
    getRegionString(region) {
      switch (region) {
        case 1:
          return "EU";
        case 2:
          return "NA";
        case 3:
          return "AUS";
        case 4:
          return "NZ";
        case 5:
          return "JP";
        case 6:
          return "CH";
        case 7:
          return "Asia";
        case 8:
          return "Global";
        default:
          return "TBA";
      }
    },
    foramttedDate(date) {
      return new Intl.DateTimeFormat().format(date * 1000);
    }
  }
};
</script>

<style scoped>
.release-dates {
  width: 375px;
  max-width: 375px;
  margin: 1rem 0;
  align-self: center;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 5px;
  border: 1px solid var(--color-highlight);
  list-style: none;
  text-align: center;
}
.title {
  display: flex;
  justify-content: center;
}
.platform {
  min-width: 175px;
  text-align: left;
}
.date {
  font-weight: bold;
}
</style>
