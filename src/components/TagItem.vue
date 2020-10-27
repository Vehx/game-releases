<template>
  <div class="tag" :title="tag">
    {{ tag }}
  </div>
</template>

<script>
export default {
  name: "TagItem",
  props: {
    tag: String
  }
};
</script>

<style scoped>
.tag {
  display: inline-block;
  border: 1px solid var(--color-highlight);
  border-radius: 5px;
  background-color: var(--color-highlight);
  margin: 3px 5px 3px 0;
  padding: 0 2px;
  color: var(--color-background-main);
}
</style>
