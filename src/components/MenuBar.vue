<!--
 * @Author: zhimin
 * @Date: 2021-02-23 15:27:20
 * @LastEditors: zhimin
 * @LastEditTime: 2021-02-25 17:28:20
 * @FilePath: \books\demo\src\components\MenuBar.vue
-->
<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow':isSettingBar||!ifTitleAndMenuShow}"
        v-show="ifTitleAndMenuShow"
      >
        <div class="icon-wrapper">
          <span class="icon">&#xe710;</span>
          <span
            class="icon"
            @click="showSettingBar(2)"
          >&#xe604;</span>
          <span
            class="icon"
            @click="showSettingBar(1)"
          >&#xe603;</span>
          <span
            class="icon"
            @click="showSettingBar(0)"
          >&#xe61e;</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div
        class="setting-wrapper"
        v-show="isSettingBar"
      >
        <div
          class="setting-font-size"
          v-if="showTag==0"
        >
          <div
            class="preview"
            :style="{fontSize:fontSizeList[0].fontSize +'px'}"
          >A</div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item,index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="pointer-wrapper">
                <div
                  class="point"
                  v-show="defaultFontSize==item.fontSize"
                >
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize +'px'}"
          >A</div>
        </div>
        <div
          class="setting-theme"
          v-if="showTag==1"
        >
          <div
            class="setting-theme-item"
            v-for="(item,index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :style="{background:item.style.body.background}"
              :class="{hasBorder:item.style.body.background=='#fff'}"
            ></div>
            <div
              class="text"
              :class="{selected: index == defaultTheme}"
            >{{item.name}}</div>
          </div>
        </div>
        <div
          class="setting-progress"
          v-if="showTag==2"
        >
          <div class="progress-wrapper">
            <input
              type="range"
              class="progress"
              max="100"
              min="1"
              step="1"
              @change="onProgressChange"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
            />
            <div class="text-wrapper">
              <span>{{bookAvailable?progress+'%':'加载中...'}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>

</template>

<script>
export default {
  data () {
    return {
      isSettingBar: false,
      showTag: 0,
      progress: 0
    }
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: {
      type: Number,
      default: 0
    },
    bookAvailable: Boolean
  },
  created () {

  },
  mounted () {

  },
  methods: {
    showSettingBar (index) {
      this.isSettingBar = true
      this.showTag = index
    },
    hideSettingBar () {
      this.isSettingBar = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    setTheme (index) {
      console.log(index)
      this.$emit('setTheme', index)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/global.scss';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    z-index: 199;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    right: 0;
    width: 100%;
    height: px2rem(60);
    background: #ffffff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    z-index: 199;
    .setting-font-size {
      height: 100%;
      display: flex;
      align-items: center;
      .preview {
        flex: 0 0 px2rem(40);
        text-align: center;
      }
      .select {
        flex: 1;
        display: flex;
        .select-wrapper {
          height: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .pointer-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-8);
              display: flex;
              justify-content: center;
              align-items: center;
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: #ffffff;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: #000000;
                border-radius: 50%;
              }
            }
          }
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      align-items: center;
      .setting-theme-item {
        height: 100%;
        box-sizing: border-box;
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        .preview {
          flex: 1;
          &.hasBorder {
            border: px2rem(1) solid #ccc;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          height: px2rem(20);
          line-height: px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
    }
  }
}
</style>
