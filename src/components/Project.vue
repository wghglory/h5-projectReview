// https://github.com/shershen08/vuejs-sound-player/blob/master/src/vueaudio.plugin.js
<template>
  <div class="container">
    <section class="wrapper">
      <div class="mediaTools">
        <audio controls ref="audioEle">
          <source src="../assets/media/music.mp3" type="audio/mpeg" />
        </audio>
        <div :class="['playerBtn', {play: !playing }]" @touchstart="togglePlay" />
        <span class="currentTime">{{formattedCurrentTime}}</span>
        <span class="duration">{{formattedDuration}}</span>
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
      <a class="toReportBtn" @touchstart="$router.push(`/reviews?projectId=${$route.params.id}`)">
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
    data() {
      return {
        project: {},
        playing: false,
        currentTime: 0,
        duration: 0.1
      };
    },
    methods: {
      togglePlay() {
        if (this.playing) {
          this.playing = false;
          this.$refs.audioEle.pause();
          clearInterval(this.timer);
        } else {
          this.playing = true;
          this.timer = setInterval(() => {
            this.duration = this.$refs.audioEle.duration;
            this.currentTime = this.$refs.audioEle.currentTime;
          }, 1000);
          this.$refs.audioEle.play();
        }
      }
    },
    computed: {
      playProgress() {
        return (this.currentTime / this.duration) * 100 + '%';
      },
      formattedCurrentTime() {
        return formatTime(this.currentTime);
      },
      formattedDuration() {
        return formatTime(this.duration);
      }
    },
    created() {
      this.$http.get(`${baseUrl}/projects/${this.$route.params.id}`).then(res => {
        this.project = res.body.project;
      });
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/Project.scss";
</style>
