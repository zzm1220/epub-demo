<!--
 * @Author: zhimin
 * @Date: 2021-02-20 16:29:19
 * @LastEditors: zhimin
 * @LastEditTime: 2021-02-23 10:12:45
 * @FilePath: \books\demo\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app'
}
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>
<style>
</style>
