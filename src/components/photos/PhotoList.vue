<template lang="html">
  <div class="">
    <!-- 顶部滑动条区域  -->
    <div id="slider" class="mui-slider" ref='mybox'>
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id== 0 ? 'mui-active':'' ]" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.ref)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link :to="{path:'/home/photoinfo/'+item.id,query:{ref:item.ref}}" v-for="item in list" :key="item.id"  tag="li">
        <img v-lazy="item.dataSrc">
        <span class="type mui-icon mui-icon-pengyouquan">{{item.des}}</span>
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
        </div>
      </router-link >
    </ul>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js';
// mui(".mui-scroll-wrapper").scroll({
//   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
// });

export default {
  data(){
    return {
        cates:[],//所有分类的列表
        list:[]
    }
  },
  created(){
    // mui.init()
    this.getAllCategory();
    this.getPhotoListByCateId("/tags/1068.html"); //默认加载一次
  },
  // 如果要操作元素,最好再mounted里面,因为这时候dom元素是最新加载的
  mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    this.getref()
    this.$nextTick(function(){
      mui(".mui-scroll-wrapper").scroll({
        // indicators: true,
        // scrollX: true,
        // bounce: true,
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        // startX: 0, //初始化时滚动至x
        // startY: 0, //初始化时滚动至y
        // indicators: true, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true, //是否启用回弹
        // deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      })
    })
    // console.log(this);
    // this.hackReset = false
  },
  methods:{
    getref(){
      console.log(this.$refs.mybox)
      console.log()
    },
    getAllCategory(){
      this.$http.get("getCategorys").then(res=>{
        if (res.body.status === 0) {
          this.cates = res.body.message;
        }
      })
    },
    getPhotoListByCateId(cateID){
      this.$http.get("getimages",{params:{id:cateID}}).then(res=>{
        if (res.body.status === 0) {
           this.list = res.body.message;
           // console.log(res.body.message);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    touch-action:pan-y;
  }

.photo-list {
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    list-style: none;
    background-color: white;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    position: relative;
    img {
      width:100%;
      // display: block;
      vertical-align: top;
    }
    img[lazy="loading"] {
      // 自定义loading样式
       width: 40px;
       height: 50px;
       margin: auto;
       background: url('../../images/loading.gif') no-repeat;
     }
    .info {
       max-height: 84px;
       color: white;
       position: absolute;
       background: rgba(0,0,0,0.4);
       bottom: 0;
       left: 0;
       .info-title {
         font-size: 14px;
         text-align: left;
       }
     }
    .type {
        color: white;
        font-size: 14px;
        font-size: 14px;
        position: absolute;
        top: 10px;
        left: 10px;
    }
  }

}
</style>
