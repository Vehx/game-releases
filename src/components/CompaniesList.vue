<template>
  <div v-if="list" class="companies-list">
    <div class="developers">
      <h3>
        Developers:
      </h3>
      <span v-if="developers">
        <a
          v-for="company in developers"
          :key="company.id"
          :href="
            company.company.websites ? company.company.websites[0].url : '#'
          "
          rel="noopener nofollow"
        >
          <TagItem :tag="company.company.name" />
        </a>
      </span>
      <span v-if="!hasDevelopers">TBA</span>
    </div>
    <div class="publishers">
      <h3>
        Publishers:
      </h3>
      <span v-if="publishers">
        <a
          v-for="company in publishers"
          :key="company.id"
          :href="
            company.company.websites ? company.company.websites[0].url : '#'
          "
          rel="noopener nofollow"
        >
          <TagItem :tag="company.company.name" />
        </a>
      </span>
      <span v-if="!hasPublishers">TBA</span>
    </div>
    <div class="supporting">
      <h3>
        Supporting Developers:
      </h3>
      <span v-if="supporting">
        <a
          v-for="company in supporting"
          :key="company.id"
          :href="
            company.company.websites ? company.company.websites[0].url : '#'
          "
          rel="noopener nofollow"
        >
          <TagItem :tag="company.company.name" />
        </a>
      </span>
      <span v-if="!hasSupporting">N/A</span>
    </div>
  </div>
</template>

<script>
import TagItem from "@/components/TagItem";
export default {
  name: "CompaniesList",
  props: {
    list: Object
  },
  components: {
    TagItem
  },
  data() {
    return {
      hasDevelopers: false,
      hasPublishers: false,
      hasSupporting: false
    };
  },
  computed: {
    developers() {
      return this.getDevelopers();
    },
    publishers() {
      return this.getPublishers();
    },
    supporting() {
      return this.getSupporting();
    }
  },
  methods: {
    getCompanies(list, category) {
      let result = [];
      for (let i = 0; i < list.length; i++) {
        const company = list[i];
        if (company[category]) {
          result.push(company);
        }
      }
      return result;
    },
    getDevelopers() {
      const result = this.getCompanies(this.list, "developer");
      if (result[0]) {
        this.hasDevelopers = true;
      }
      return result;
    },
    getPublishers() {
      const result = this.getCompanies(this.list, "publisher");
      if (result[0]) {
        this.hasPublishers = true;
      }
      return result;
    },
    getSupporting() {
      const result = this.getCompanies(this.list, "supporting");
      if (result[0]) {
        this.hasSupporting = true;
      }
      return result;
    }
  }
};
</script>

<style scoped>
h3 {
  display: inline;
}
.developers,
.publishers,
.supporting {
  margin: 0.2rem 0;
}
</style>
