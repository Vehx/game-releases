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
  border-radius: 5px;
  background-color: var(--color-highlight);
  margin: 2px 4px 2px 0;
  padding: 2px;
  color: var(--color-background-main);
}
</style>
