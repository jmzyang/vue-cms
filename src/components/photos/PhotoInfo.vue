<template lang="html">
  <div class="">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>{{photoinfo.des}}</span>
    </p>
    <hr>
    <div class="hums mui-clear">
      <vue-preview :slides="humimages" ></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content">
    </div>
    <comment-box></comment-box>
  </div>
</template>

<script>
import comment  from '../subcomponents/comment.vue'
export default {
  data(){
    return {
      ref: this.$route.query.ref,
      photoinfo:{},
      humimages:[]
    }
  },
  created(){
    this.getPhotoInfo(this.ref);
    this.getthumimage(this.ref);
  },
  methods:{
    getPhotoInfo(href){
      this.$http.get('getphotoinfo',{params:{ref:href}}).then(res=>{
        if (res.body.status === 0) {
          res.body.message[0].content = res.body.message[0].content.replace(/data-src/g,'src');
          this.photoinfo = res.body.message[0];
        }
      })
    },
    getthumimage(href){
      this.$http.get('getthumimage',{params:{ref:href}}).then(res=>{
        if (res.body.status === 0) {
          // 循环补全
          res.body.message.forEach(item=>{
            item.src = item.dataSrc;
            item.msrc = item.dataSrc;
            item.w=600;
            item.h=400;
          });
          this.humimages = res.body.message;

        }
      })
    },
    handleClose () {
        console.log('close event')
      }
  },
  components:{
    'comment-box':comment
  }
}
</script>

<style lang="scss">
  .hums {
    overflow: hidden;
  }
    .my-gallery {
      img {
        width:25%;
        float: left;
        padding: 5px;
        box-sizing: border-box;
      }
    }
   .content {
     font-size: 14px;
     img {
       width:100%;
     }

   }
</style>
