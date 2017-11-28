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
  @import "../scss/globals.scss";

  .reviewNav {
    padding: px2rem(14) 0;
    a {
      display: inline-block;
      padding: px2rem(6) 0;
      width: 40%;
      font-size: px2rem(12);
      text-align: center;
      color: $mainGreen;
      background: rgb(250, 250, 250);
      border: 1px solid $mainGreen;
      &.active {
        color: rgb(250, 250, 250);
        background: $mainGreen;
        border: 1px solid $mainGreen;
      }
      &:first-of-type {
        border-top-left-radius: px2rem(16);
        border-bottom-left-radius: px2rem(16);
      }
      &:last-of-type {
        border-top-right-radius: px2rem(16);
        border-bottom-right-radius: px2rem(16);
      }
    }
  }

  .projectList ul {
    padding: 0 px2rem(14);

    li {
      background: white;
      box-shadow: 0 0px 3px 0px rgba(0, 0, 0, 0.16);
      margin-bottom: px2rem(10);
      display: flex;
      align-items: center;
      font-size: 1rem;
      padding: px2rem(6) 0;
      border-radius: 4px;
      color: rgb(36, 36, 36);
      span:first-of-type {
        width: px2rem(50);
        height: px2rem(50);
        background-size: contain;
        background-repeat: no-repeat;
        flex: 2;
      }
      span:nth-of-type(2) {
        flex: 7;
        padding: 0 px2rem(10);
      }
      span:last-of-type {
        padding: 4px;
        flex: 1;
        font-size: px2rem(12);
      }
    }
  }

</style>
