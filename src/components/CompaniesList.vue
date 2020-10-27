<template>
  <div v-if="list" class="companies-list">
    <div>
      <h3>
        Developers:
      </h3>
      <span v-if="developers">
        <a
          v-for="company in developers"
          :key="company.id"
          :href="
            company.company.websites ? company.company.websites[0].url : ''
          "
          rel=""
        >
          <TagItem :tag="company.company.name" />
        </a>
      </span>
      <span v-else>TBA</span>
    </div>
    <div>
      <h3>
        Publishers:
      </h3>
      <span v-if="publishers">
        <a
          v-for="company in publishers"
          :key="company.id"
          :href="
            company.company.websites ? company.company.websites[0].url : ''
          "
          rel=""
        >
          <TagItem :tag="company.company.name" />
        </a>
      </span>
      <span v-else>TBA</span>
    </div>
    <div>
      <h3>
        Supporting Developers:
      </h3>
      <span v-if="supporting">
        <a
          v-for="company in supporting"
          :key="company.id"
          :href="
            company.company.websites ? company.company.websites[0].url : ''
          "
          rel=""
        >
          <TagItem :tag="company.company.name" />
        </a>
      </span>
      <span v-else>TBA</span>
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
  computed: {
    developers() {
      return this.getCompanies(this.list, "developer");
    },
    publishers() {
      return this.getCompanies(this.list, "publisher");
    },
    supporting() {
      return this.getCompanies(this.list, "supporting");
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
    }
  }
};
</script>

<style scoped>
h3 {
  display: inline;
}
</style>
