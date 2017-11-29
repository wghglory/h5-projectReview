<template>
  <article class="reviewItem">
    <div :class="['reviewItemHeader', {active: review.id === selectedReviewId, valueMoreThanOne: selectedProblems.length > 0}]"
      @touchstart="emitProblemCategory(review.id)">
      <span class="iconfont icon-gouxuan" /> {{review.problemCategory}}
    </div>
    <ul :class="{ hide: review.id !== selectedReviewId }">
      <template v-for="(problem,index) in review.problems">
        <app-problem :key="index" :problem="problem" @problemChanged="onProblemChange(review.id, problem)"></app-problem>
      </template>
    </ul>
  </article>
</template>

<script>
  import ReviewProblem from './ReviewProblem';

  export default {
    components: {
      'app-problem': ReviewProblem
    },
    data() {
      return {
        selectedProblems: []
      };
    },
    props: {
      review: {
        required: true,
        type: Object
      },
      selectedReviewId: {
        required: true,
        type: Number
      }
    },
    methods: {
      emitProblemCategory(id) {
        this.$emit('problemCategoryChanged', id);
      },
      onProblemChange(id, problem) {
        if (this.selectedProblems.indexOf(problem) > -1) {
          this.selectedProblems.splice(this.selectedProblems.indexOf(problem), 1);
        } else {
          this.selectedProblems.push(problem);
        }
        this.$emit('problemsChanged', {reviewId: id, problems: this.selectedProblems});
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../scss/Review.scss";
</style>
