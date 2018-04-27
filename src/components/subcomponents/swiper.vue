<template lang="html">
  <div class="">
    <mt-swipe :auto="4000">
      <!-- 在组件中,使用v-for循环的话,一定要使用key -->
      <!-- 抓取数据的时候src就命名为url -->
      <!-- 轮播图所遍历的数据 应该由父组件向子组件传值 -->
    <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
      <!-- 让普通属性识别vue,需要加绑定:v-bind 防止认识是字符串 -->
      <img :src="item.url" alt="" :class="{full:isfull}">
    </mt-swipe-item>
  </mt-swipe>
  </div>
</template>

<script>
export default {
  props:["lunbotuList",'isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height:100%;
    }
  }
}
.full {
  width: 100%;
}
</style>
