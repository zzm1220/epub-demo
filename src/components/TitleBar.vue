<!--
 * @Author: zhimin
 * @Date: 2021-02-23 15:27:13
 * @LastEditors: zhimin
 * @LastEditTime: 2021-02-23 16:08:58
 * @FilePath: \books\demo\src\components\TitleBar.vue
-->
<template>
  <transition name="slide-down">
    <div
      class="title-wrapper"
      v-show="ifTitleAndMenuShow"
    >
      <div class="left">
        <span class="icon">&#xe6db;</span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon">&#xe616;</span>
          <span class="icon">&#xe600;</span>
          <span class="icon">&#xe601;</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/global.scss';
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: px2rem(48);
  background: #ffffff;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  z-index: 199;
  display: flex;
  .left {
    flex: 0 0 px2rem(60);
    text-align: center;
  }
  .right {
    flex: 1;
    .icon-wrapper {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .icon {
        flex: 0 0 px2rem(30);
      }
    }
  }
}
</style>
