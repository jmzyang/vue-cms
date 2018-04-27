<template lang="html">
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容(最多120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click = "postComment">发表评论</mt-button>
    <div class="cmt-list">
       <div class="cmt-item" v-for="(item,index) in comments" :key="item.add">
         <div class="cmt-title">
           第{{index+1}}楼&nbsp;用户:{{item.userinfo.nick}}&nbsp;&nbsp;发表时间:{{item.timeDifference}}
         </div>
         <div class="cmt-body">
           {{item.content === '' ? '此用户很烂,什么也没说' : item.content}}
         </div>
       </div>
    </div>
    <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
  data(){
    return {
      pageIndex:1,
      comments:[],
      msg:''
    };
  },
  created(){
    this.getComments();
  },
  methods:{
    getComments(){
      this.$http.jsonp('http://coral.qq.com/article/1983169624/comment',{params:{reqnum:10*this.pageIndex},commentid:'6280346786642608295'}).then(res=>{
          if (res.body.errCode===0) {
            // this.comments = this.comments.concat(res.body.data.commentid); 如果是根据页面id来查询数据库的话,需要拼接合并上一次的数组
            this.comments = res.body.data.commentid; //直接获取指定页码数
          } else {
            Toast('获取评论失败!');
          }
      })
    },
    postComment(){
      // this.$ 因为没有评论接口直接拼接假数据到数组
      var cmt = {
        userinfo:{nick:'匿名用户'},
        timeDifference:Date.now(),
        content:this.msg
      };
      this.comments.unshift(cmt);
      this.msg="";
    },
    getMore(){
      this.pageIndex++;
      this.getComments();
    }
  }
}
</script>

<style lang="scss">
  .cmt-container {
    h3 {
      font-size: 18px;
    }
    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .cmt-list {
      margin: 5px 0;
      .cmt-item {
          font-size: 13px;
        .cmt-title{
          line-height: 35px;
          background: rgb(246, 246, 246);
        }
        .cmt-body{
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>
