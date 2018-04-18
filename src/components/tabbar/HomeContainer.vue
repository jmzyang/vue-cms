<template lang="html">
  <div class="">
    <mt-swipe :auto="4000">
      <!-- 在组件中,使用v-for循环的话,一定要使用key -->
      <!-- 抓取数据的时候src就命名为url -->
    <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
      <!-- 让普通属性识别vue,需要加绑定:v-bind 防止认识是字符串 -->
      <img :src="item.url" alt="">
    </mt-swipe-item>
  </mt-swipe>
  <ul class="mui-table-view mui-grid-view mui-grid-9">
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../images/menu1.png" alt="">
               <div class="mui-media-body">Home</div></a></li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
               <div class="mui-media-body">Email</div></a></li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
               <div class="mui-media-body">Chat</div></a></li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../images/menu4.png" alt="">
               <div class="mui-media-body">location</div></a></li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../images/menu5.png" alt="">
               <div class="mui-media-body">Search</div></a></li>
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../images/menu6.png" alt="">
               <div class="mui-media-body">Phone</div></a></li>
           </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  data(){
    return {
      lunbotuList:[]
    }
  },
  created(){
    this.getLunbotu();
  },
  methods:{
    getLunbotu(){
      this.$http.get('http://localhost:3000/getBg').then(res=>{
        // console.log(res.body);
        if (res.body.status === 0) {
          //成功了
          this.lunbotuList = res.body.bgs;
        }else {
          //失败
          Toast('加载轮播图失败...');
        }
      });
    }
  }
}
</script>

<style lang="scss">
 .mint-swipe {
   height: 200px;
   .mint-swipe-item {
     &:nth-child(1){
       background-color:rgb(75, 212, 88);
     }
     &:nth-child(2){
       background-color:rgb(212, 143, 75);
     }
     &:nth-child(3){
       background-color:rgb(212, 75, 111);
     }
     img {
       width:100%;
       height:100%;
     }
   }
 }
 .mui-grid-view.mui-grid-9 {
   background-color:white;
   border:0;
   .mui-table-view-cell {
     border:0;
     img {
       height:60px;
       width:60px;
     }
     .mui-media-body {
       font-size:14px;
     }
   }
 }

</style>
