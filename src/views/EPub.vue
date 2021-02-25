<!--
 * @Author: zhimin
 * @Date: 2021-02-23 10:09:32
 * @LastEditors: zhimin
 * @LastEditTime: 2021-02-25 17:34:30
 * @FilePath: \books\demo\src\views\EPub.vue
-->
<template>
  <div class="ebook">
    <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div
          class="left"
          @click="prevPage"
        ></div>
        <div
          class="center"
          @click="toggleTitleAndMenu"
        ></div>
        <div
          class="right"
          @click="nextPage"
        ></div>
      </div>
    </div>
    <menu-bar
      :ifTitleAndMenuShow="ifTitleAndMenuShow"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themeList="themeList"
      :defaultTheme="defaultTheme"
      @setTheme="setTheme"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      ref="menuBar"
    ></menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from '../components/TitleBar.vue'
import MenuBar from '../components/MenuBar.vue'
const DOWNLOAD_URL = 'static/2018_Book_AgileProcessesInSoftwareEngine.epub'
export default {
  components: { TitleBar, MenuBar },
  data () {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000',
              background: '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff',
              background: '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000',
              background: 'rgb(241,236,226)'
            }
          }
        }
      ],
      defaultTheme: 0,
      bookAvailable: false
    }
  },
  created () {

  },
  mounted () {
    this.showEpub()
  },
  methods: {
    showEpub () {
      this.book = new Epub(DOWNLOAD_URL)
      console.log(this.book)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
      this.themes = this.rendition.themes
      this.setFontSize(this.defaultFontSize)
      this.registerTheme()
      this.setTheme(0)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(() => {
        this.locations = this.book.locations
        this.bookAvailable = true
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleTitleAndMenu () {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSettingBar()
      }
    },
    setFontSize (fontSize) {
      if (this.themes) {
        this.themes.fontSize(`${fontSize}px`)
        this.defaultFontSize = fontSize
      }
    },
    registerTheme () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    setTheme (index) {
      const name = this.themeList[index].name
      this.book.rendition.themes.select(name)
      const bodyObject = this.themeList[index].style.body
      for (const key in bodyObject) {
        this.themes.override(key, bodyObject[key], true)
      }
      this.defaultTheme = index
    },
    onProgressChange (progress) {
      const percentage = progress / 100
      console.log(percentage)
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    jumpTo (href) {
      this.rendition.display(href)
    },
    hideTitleAndMenu () {
      this.ifTitleAndMenuShow = false
      this.$refs.menuBar.hideSettingBar()
      this.$refs.menuBar.hideContent()
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/global.scss';

.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
