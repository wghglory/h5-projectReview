<template>
  <div class="container gray">
    <section class="wrapper">
      <div class="reviewScore">
        <span class="score">{{currentScore}}</span>分
      </div>
      <div class="reviewScroll">
        <div>
          <span @touchstart="() => updateScore.call(null, '-')">
            <i class="icon-jianhao iconfont" />
          </span>
        </div>
        <div class="reviewScorebar" ref="scorebar">
          <div class="reviewScorebarCurrent" :style="{ width: currentScore + '%' }" @touchstart="touchStart" @touchmove="touchMove"
            @touchend="touchEnd" />
        </div>
        <div>
          <span @touchstart="updateScore('+')">
            <i class="icon-jiahao iconfont" />
          </span>
        </div>
      </div>
      <div class="reviewList">
        <h3>该项目存在的问题</h3>
        <template v-for="(review,index) in reviews">
          <app-problem-category :key="index" :review="review" :selectedReviewId="selectedReviewId" @problemCategoryChanged="onProblemCategoryToggle"
            @problemsChanged="onProblemsChange"></app-problem-category>
        </template>
      </div>
      <div class="comment">
        <h3>主观评价</h3>
        <textarea v-model="comment" class="reviewArea" placeholder="请输入你对这个项目的评价" />
      </div>
    </section>
    <section class="reviewFooter">
      <a class="reviewSubmit" @touchstart="onOpenModal">
        提交
      </a>
    </section>
    <app-modal :isModalOpen="isModalOpen" @modalClosed="onCloseModal" @submitForm="onFormSubmit"></app-modal>
  </div>
</template>

<script>
  import ReviewModal from './ReviewModal.vue';
  import ReviewProblemCategory from './ReviewProblemCategory.vue';

  import {
    baseUrl
  } from '../utils/api';

  import {
    ModalHelper
  } from '../utils/tools';

  export default {
    components: {
      'app-modal': ReviewModal,
      'app-problem-category': ReviewProblemCategory
    },

    data() {
      return {
        currentScore: 50,
        comment: '',
        reviews: [],
        selectedProblems: {}, // problemCategory/reviewId : [problem1, problem2]
        selectedReviewId: -1,
        isModalOpen: false
      };
    },

    methods: {
      updateScore(operator) {
        if (operator === '+') {
          this.currentScore += 1;
        } else {
          this.currentScore -= 1;
        }

        if (this.currentScore > 100) {
          this.currentScore = 100;
        } else if (this.currentScore < 0) {
          this.currentScore = 0;
        }
      },
      touchStart(e) {
        // 按下：改变绿条宽度、得分
        if (e.touches.length !== 1) {
          e.preventDefault();
        }
        const prevClientX = e.targetTouches[0].clientX; // 初始按下位置

        // 按下瞬间绿条宽度变化，其右侧和鼠标按下位置一齐
        // e.target.style.width = prevClientX - this.scorebar.offsetLeft + 'px';

        // 按下瞬间计算当前位置的分数
        // currentScore: Math.floor(e.target.offsetWidth / pWidth * 100)
        this.currentScore = Math.floor((prevClientX - this.$refs.scorebar.offsetLeft) / this.$refs.scorebar.clientWidth *
          100);
      },
      touchMove(e) {
        const pWidth = this.$refs.scorebar.clientWidth;
        const touch = e.targetTouches[0];

        // 如果鼠标滑动到 parentNode 之外，阻止之后代码
        if (touch.clientX < this.$refs.scorebar.offsetLeft || touch.clientX > this.$refs.scorebar.offsetLeft + pWidth) {
          return false;
        }

        const greenWidth = touch.clientX - this.$refs.scorebar.offsetLeft;
        // e.target.style.width = touch.clientX - this.scorebar.offsetLeft + 'px'; // 绿色宽度 = 鼠标位置 - 滚动条左侧到屏幕左侧距离

        // 左侧边界
        if (e.target.offsetWidth <= 0) {
          this.currentScore = 0;
          // e.target.style.width = 0;
        }
        // 右侧边界
        if (e.target.offsetWidth >= pWidth) {
          this.currentScore = 100;
          // e.target.style.width = pWidth + 'px';
        }

        // 更新分数
        this.currentScore = Math.floor(greenWidth / this.$refs.scorebar.clientWidth * 100);
      },
      touchEnd(e) {
        e.target.removeEventListener('touchmove', this.touchMove);
        e.target.removeEventListener('touchend', this.touchMove);
      },
      // 子级向 siblings 通信，更新 problemCateogry
      // 子级 li click 更新 parent state，此状态通过 props 传到 siblings，selectedReviewId 和 siblings id 对比判断状态
      onProblemCategoryToggle(data) {
        // 如果还是选中刚才选中的li，则 toggle 它，此时没有选中任何 li
        if (data === this.selectedReviewId) {
          this.selectedReviewId = -1;
        } else {
          this.selectedReviewId = data;
        }
      },
      onProblemsChange(data) {
        const {
          reviewId,
          problems
        } = data;
        this.selectedProblems[reviewId] = problems;
      },
      onOpenModal() {
        this.isModalOpen = true;
        ModalHelper.afterOpen();
      },

      onCloseModal() {
        this.isModalOpen = false;
        ModalHelper.beforeClose();
      },
      onFormSubmit() {
        const score = this.currentScore;
        const problems = Object.values(this.selectedProblems);
        const comment = this.comment;
        const searchParam = this.$route.query.projectId;

        alert(`score:${score}, problems:${problems.join('|')}, comment:${comment}, projectId: ${searchParam}`);
        this.onCloseModal();
      }
    },
    created() {
      this.$http.get(`${baseUrl}/reviews?projectId=${this.$route.query.projectId}`).then(res => {
        this.reviews = res.body;
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/Review.scss";
</style>
