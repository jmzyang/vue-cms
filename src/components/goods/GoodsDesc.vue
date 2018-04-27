<template lang="html">
   <div class="goods_content">
     <h3 >{{content.title}}</h3>
     <hr/>
     <div class="content" v-html="content.content">
     </div>
   </div>
</template>

<script>
export default {
  data(){
    return {
      ref:this.$route.params.ref,
      content:{}
    }
  },
  methods:{
    getDes(){
      this.$http.get('goodsDes',{params:{ref:this.ref}}).then(res=>{
        if (res.body.status == 0 ) {
          this.content = res.body.message[0];
        }
      })
    }
  },
  created(){
    if (this.ref) {
      this.getDes();
    }
  }
}
</script>

<style lang="scss">

   .goods_content{
     h3 {
       font-size: 16px;
       color: rgb(96, 112, 219);
       text-align: center;
       margin: 15px 0;
     }
     .content {
       img {
         width: 100%;
       }
     }
   }

</style>
