<template>
  <li @touchstart="problemClick" :class="{active: selected}">
    <span class="iconfont icon-gouxuan" />
    <a href="javascript:">{{problem}}</a>
  </li>
</template>

<script>
  export default {
    props: ['problem'],
    data() {
      return {
        selected: false
      };
    },
    methods: {
      problemClick() {
        this.selected = !this.selected;
        this.$emit('problemChanged');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/Review.scss";
</style>
