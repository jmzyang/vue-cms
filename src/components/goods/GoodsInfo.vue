<template lang="html">
    <div class="goodsinfo-container">
      <transition
      @before-enter="beforeEnter"
      @enter = "enter"
      @after-enter = "afterEnter">
      <div ref="ball" class="ball" v-show="ballFlag"></div>
      </transition>
      <!-- 商品轮播区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
					</div>
				</div>
			</div>
      <!-- 商品购买区域 -->
      <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

            <p>市场价: ¥ <span class="old"> 2399</span> &nbsp;&nbsp; 销售价: ¥ <span class="now"> 2199</span></p>
            <p>购买数量:<numbox :max="goodsinfo.maxnumber" @getcount="getSelectedCount"><numbox></p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="toggleBall">加入购物车</mt-button>
					</div>
				</div>
			</div>
      <!-- 商品参数区域 -->
      <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <p>商品货号:{{goodsinfo.number}}</p>
            <p>库存情况:{{goodsinfo.maxnumber}}</p>
						<p>上架时间:{{goodsinfo.startTime}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id,ref)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id,ref)">商品评论</mt-button>
        </div>
			</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_number.vue'
export default {
  data(){
    return {
        ref:this.$route.params.ref,
        lunbotuList:[],
        goodsinfo:{},
        id:0,
        ballFlag:false,  // 动画默认为隐藏
        selectedCount:1 //用户选择的数量默认为1
    }
  },
  created(){
    if (this.ref) {
      this.getgoodsinfo();
    }
    // this.getgoodsinfo(ref);
  },
  methods:{
      getgoodsinfo(){
        this.$http.get('getGoodsInfo',{params:{ref:this.ref}}).then(res=>{
          if (res.body.status == 0) {
            res.body.message.forEach(item=>{
              item.url = item.urlImg;
            })
            this.lunbotuList = res.body.message;
            res.body.message[0].maxnumber = 10;
            this.goodsinfo = res.body.message[0];
            this.id = res.body.message[0].number;
          }
        })
      },
      goDesc(id,ref){
        this.$router.push({name:'goodsdesc',params:{id,ref}})
      },
      goComment(id,ref){
        this.$router.push({name:'goodscomment',params:{id,ref}})
      },
      toggleBall(){
        this.ballFlag = !this.ballFlag;
      },
      beforeEnter(el){
        el.style.transform = "translate(0,0)";
      },
      enter(el,done){
        const  ballPosition = this.$refs.ball.getBoundingClientRect();
        const  badgePosition = document.getElementById('badge').getBoundingClientRect();
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;
        el.style.transform = 'translate('+xDist+'px,'+yDist+'px)';
        el.style.transition = "all 1s ease";
        done()
      },
      afterEnter(el){
        this.ballFlag = !this.ballFlag;
      },
      getSelectedCount(count){
        this.selectedCount = count;
        console.log('父组件拿到的:'+this.selectedCount);
      }
  },
  components:{
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
 .ball {
   width: 17px;
   height: 17px;
   border-radius: 50%;
   background: rgb(191, 86, 86);
   position: absolute;
   left: 135px;
   top: 390px;
   z-index: 999;
 }
 .goodsinfo-container {
   background: #eee;
   overflow: hidden;
 }
 .old {
   text-decoration: line-through;
 }
 .now {
   color: red;
   font-size: 16px;
   font-weight: bold;
 }
 .mui-card-footer {
   display: block;
   .mint-button {
     margin: 15px 0;
   }
 }
</style>
