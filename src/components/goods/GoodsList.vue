<template lang="html">
  <div class="goods-list">


    <!-- <router-link :to="'/home/goodsinfo/'+item.id" tag="div"  class="goods-item" v-for="item in goodsList" :key="item.id"> -->
      <!-- <img :src="item.urlImg" alt="">
      <h1 class="title">{{item.text}}</h1>
      <div class="info">
        <p class="price">
          <span class="now mui-icon mui-icon-star">{{item.favod}}</span>
          <span class="old mui-icon mui-icon-chat">{{item.mess}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div> -->
    <!-- </router-link> -->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id,item.ref)">
      <img :src="item.urlImg" alt="">
      <h1 class="title">{{item.text}}</h1>
      <div class="info">
        <p class="price">
          <span class="now mui-icon mui-icon-star">{{item.favod}}</span>
          <span class="old mui-icon mui-icon-chat">{{item.mess}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩60件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click ="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      page:1,
      goodsList:[]
    }
  },
  methods:{
    getgoodsList(page){
      this.$http.get('getGoods',{params:{page:page}}).then(res=>{
        if (res.body.status == 0) {
          // console.log(res);
          this.goodsList = this.goodsList.concat(res.body.message);
        }
      });
    },
    getMore(){
      this.page++;
      this.getgoodsList(this.page);
    },
    goDetail(id,ref){
      // 使用js的形式进行编程跳转导航,vue中不允许window.location.href
      // this.$router.push('/home/goodsinfo/'+id);
      this.$router.push({name:"goods",params:{id,ref}})
    }
  },
  created(){
    this.getgoodsList(this.page);
  }
}
</script>

<style lang="scss" scoped>
 .goods-list {
   display: flex;
   flex-wrap: wrap;
   padding: 5px;
   justify-content: space-between;
   .goods-item {
     width: 49%;
     box-sizing: border-box;
     border: 1px silid #ccc;
     box-shadow: 0 0 5px #ccc;
     margin: 5px 0;
     padding: 2px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;

     img {
       width: 100%;
     }
     .title {
       font-size: 14px;
     }
     .info {
       background:#eee;
       p {
         margin: 0;
         padding: 5px;
       }
       .price {
         .now {
            font-size: 16px;
            font-weight: bold;
            color: rgb(208, 3, 12);
         }
         .old {
           text-decoration: line-through;
           font-size: 12px;
           margin-left: 20px;
         }
       }
       .sell {
         display: flex;
         justify-content: space-between;
         font-size: 13px;
       }
     }
   }

 }
</style>
