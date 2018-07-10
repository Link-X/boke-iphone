<template>
  <div class="not-found-component">
    <div class="found-component_top">
      <van-icon class="found-component_icon"
                name="clear" />
    </div>
    <p class="found-component_text">
      <span class="left-transition">我们在找什么？</span>
    </p>
    <div class="found-component_btn">
      <van-button type='text'
                  @click="back">返回</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style lang='less' scoped>
  .found-component_top {
    text-align: center;
  }
  .not-found-component {
    font-size: 0.2rem;
    font-weight: bold;
    padding-top: 3em;
  }
  .found-component_text {
    margin-top: 0.3rem;
    position: relative;
    height: 45px;
  }
  .found-component_btn {
    margin-top: 0.2rem;
    text-align: right;
    padding-right: 0.4rem;
  }
  .found-component_icon {
    font-size: 0.5rem;
    color: tomato;
    animation: routes 3s infinite;
  }
  .left-transition {
    position: absolute;
    transform: translateX(0px);
    animation: transitionx 5s infinite;
  }
  @keyframes routes {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes transitionx {
    0% {
      transform: translate3d(0%, 0, 0);
    }
    50% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
</style>
