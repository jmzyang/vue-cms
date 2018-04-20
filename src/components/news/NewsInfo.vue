<template lang="html">
  <div class="newsinfo-container">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
      <span>{{newsInfo.time}}</span>
      <span>简报</span>
    </p>
    <hr>
    <div class="content" v-html="newsInfo.content">
    </div>
    <comment-box></comment-box>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import comment from '../subcomponents/comment.vue'
export default {
  data(){
    return {
      id:this.$route.params.id,
      newsInfo:{}
    }
  },
  created(){
    this.getnewsDetail();
  },
  components:{
    'comment-box':comment
  },
  methods:{
    getnewsDetail(){
        this.$http.get('getnewsDetail',{params:{id:this.id}}).then(res=>{
          if (res.body.status === 0) {
            this.newsInfo = res.body.message[0];
            console.log(res.body.message);
          }else {
            Toast('获取新闻失败!');
          }
        });
    }
  }
}
</script>

<style lang="scss">
  .newsinfo-container {
    padding: 0 5px;
    .title{
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
      color: rgb(34, 18, 29);
    }
    .subtitle{
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
    .content {
      img {
        width: 100%;
      }
    }
  }
</style>
