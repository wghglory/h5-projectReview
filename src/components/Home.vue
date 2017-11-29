<template>
  <div class="container gray">
    <nav class="reviewNav flexbox">
      <a :class="{active: !this.showReviewed}" @touchstart="showReviewed = false;">
        未批阅
      </a>
      <a :class="{active: this.showReviewed}" @touchstart="showReviewed = true;">
        已批阅
      </a>
    </nav>
    <section class="projectList">
      <ul :class="{hide: this.showReviewed}">
        <li v-for="(p,index) in unReviewedProjects" :key="index" @touchstart="$router.push(`/projects/${p.id}`)">
          <span :style="{ background: `url(${require( '../assets/img/' + (index % 5 + 1) + '@2x.png')}) no-repeat center`, backgroundSize:
            `contain` }" />
          <span>{{p.name}}</span>
          <span class="icon-zhankai iconfont" />
        </li>
      </ul>
      <ul :class="{hide: !this.showReviewed}">
        <li v-for="(p,index) in reviewedProjects" :key="index" @touchstart="$router.push(`/projects/${p.id}`)">
          <span :style="{ background: `url(${require( '../assets/img/' + (index % 5 + 1) + '@2x.png')}) no-repeat center`, backgroundSize:
            `contain` }" />
          <span>{{p.name}}</span>
          <span class="icon-zhankai iconfont" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import {
    baseUrl
  } from '../utils/api';

  export default {
    data () {
      return {
        showReviewed: false,
        projects: []
      };
    },
    computed: {
      unReviewedProjects () {
        return this.projects.filter(p => {
          return p.reviewed === false;
        });
      },
      reviewedProjects () {
        return this.projects.filter(p => {
          return p.reviewed === true;
        });
      }
    },
    created () {
      this.$http.get(`${baseUrl}/projects`).then(res => {
        this.projects = res.body;
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/Home.scss";
</style>
