<template lang="html">
  <div class="">
    <ul class="mui-table-view">

				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key='item.id'>
            <router-link :to="'/home/newsinfo'+item.id">
              <!-- 因为穿过来的id是/number 所以to少些一个/ -->
            <a class="mui-media-object mui-pull-left" :style="item.urlImg"></a>
						<div class="mui-media-body">
							 <h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                <span>{{item.time}}</span>
                <span>{{item.des}}</span></p>
						</div>
          </router-link>
				</li>

			</ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data(){
    return {
      newslist:[]
    }
  },
  created(){
    this.getNewsList();
  },
  methods:{
    getNewsList(){
      this.$http.get("getnewslist",{params:{'test':1}}).then(res=>{
        if (res.body.status === 0) {
          this.newslist = res.body.message;
          console.log(res.body.message);
        }else {
          Toast('获取新闻列表失败!');
        }
      });
    }
  }
}
</script>
<!-- sass第二代很麻烦  scss迭代第三代项目loader scss -->
<style lang="scss" scoped>
  .mui-table-view {
    li {
      h1 {
        font-size: 14px;
      }
      .mui-ellipsis {
        font-size: 12px;
        color:  #226aff;
        display: flex;
        justify-content: space-between;
      }
    }
   .mui-media-object.mui-pull-left {
     display: block;
     width: 48px;
     height: 48px;
     background-repeat: no-repeat;
     background-size: cover;
     background-position: center;
   }
  }

</style>
