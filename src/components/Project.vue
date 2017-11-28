<template>
  <div class="container">
    <section class="wrapper">
      <div class="mediaTools">
        <audio controls ref="audioEle">
          <source src="../assets/media/music.mp3" type="audio/mpeg" />
        </audio>
        <div :class="['playerBtn', {play: !playing }]" @touchstart="playing = !playing" />
        <span class="currentTime">{{currentTime}}</span>
        <span class="duration">{{duration}}</span>
        <div class="mediaProgress">
          <div class="playProgress" :style="{ width: playProgress }" />
        </div>
      </div>
      <div class="project">
        <h3 class="projectImg">自省</h3>
        <div>每天自省，虚心学习，广交善缘，问心无愧</div>
        <div>每天自省，虚心学习，广交善缘，问心无愧</div>
        <div>每天自省，虚心学习，广交善缘，问心无愧</div>
        <label>Project Name</label>
        <p>{{project.name}}</p>
        <img src="../assets/img/default-post.jpg" />
      </div>
    </section>
    <section class="toReport">
      <a class="toReportBtn" @touchstart="$router.push(`/reviews?projectId=${this.props.match.params.id}`)">
        去评分
      </a>
    </section>
  </div>
</template>

<script>
  import {
    formatTime
  } from '../utils/tools';
  import {
    baseUrl
  } from '../utils/api';

  export default {
    data () {
      return {
        project: {},
        playing: false,
        playProgress: 0
      };
    },
    computed: {
      currentTime () {
        return this.$refs.audioEle ? formatTime(this.$refs.audioEle.currentTime) : `00:00`;
      },
      duration () {
        return this.$refs.audioEle ? formatTime(this.$refs.audioEle.duration) : `00:00`;
      }
    },
    created () {
      this.$http.get(`${baseUrl}/projects/${this.$route.params.id}`).then(res => {
        this.project = res.body.project;
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/globals.scss";

  .wrapper {
    padding: 0 px2rem(16);
    height: calcPX(100%, 60);
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .mediaTools {
    position: relative;
    height: px2rem(100);
  }

  .playerBtn {
    position: absolute;
    width: px2rem(50);
    height: px2rem(50);
    top: px2rem(24);
    left: 0;
    background-image: url("../assets/img/pause.png");
    background-size: contain;
  }

  .play {
    background-image: url("../assets/img/play.png");
  }

  .mediaProgress {
    position: absolute;
    top: px2rem(48);
    left: px2rem(92);
    background: #eef0f2;
    height: px2rem(4);
    width: px2rem(200);
  }

  .playProgress {
    width: 0;
    background: #00c993;
    height: 100%;
  }

  .currentTime,
  .duration {
    font-size: px2rem(12);
    color: grey;
    position: absolute;
  }

  .currentTime {
    left: px2rem(54);
    top: px2rem(42);
  }

  .duration {
    left: px2rem(300);
    top: px2rem(42);
  }

  .project {
    box-sizing: border-box;
    padding-bottom: px2rem(100);
    height: calcPX(100%, 44);
    img {
      height: px2rem(290);
      width: 100%;
      padding-bottom: px2rem(20);
    }
    .projectImg {
      background: url('../assets/img/default-post.jpg') no-repeat;
      background-size: cover;
      height: px2rem(140);
      text-align: center;
      line-height: px2rem(140);
      color: white;
      font-size: px2rem(40);
      margin-bottom: px2rem(20);
    }
    label {
      text-align: center;
      font-size: px2rem(24);
      display: block;
      margin: px2rem(20) 0;
    }
    p {
      font-size: px2rem(24);
      background: #b0f4b8;
      text-align: center;
      margin-bottom: px2rem(20);
    }
  }

  .toReport {
    background: #efeff3;
    height: px2rem(60);
    width: 100%;
    font-size: px2rem(16);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      border-radius: 4px;
      width: calcPX(100%, 16);
      text-align: center;
      height: px2rem(46);
      line-height: px2rem(46);
      background: #00c993;
      font-size: px2rem(16);
      box-shadow: 0 2px 9px rgba(90, 86, 108, .23);
      letter-spacing: px2rem(4);
    }
  }

  audio {
    display: none;
  }

</style>
