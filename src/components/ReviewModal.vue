<template>
  <section :class="[`modal`, { hide: !isModalOpen }]">
    <div class="modalCenter">
      <span class="iconfont icon-guanbidanchuang close" @touchstart="onCloseModal" />
      <h4>提交后无法修改</h4>
      <p>确定提交吗？</p>
      <div class="buttons">
        <a class="close" @touchstart="onCloseModal">
          再想想
        </a>
        <a class="confirm" @touchstart="onConfirmSubmit">
          确定
        </a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      isModalOpen: {
        required: true,
        type: Boolean
      }
    },
    data() {
      return {};
    },
    methods: {
      onCloseModal() {
        this.$emit('modalClosed');
      },
      onConfirmSubmit() {
        this.$emit('submitForm');
      }
    }
  };
</script>

<style lang="scss">
  @import "../scss/Review.scss";
</style>
