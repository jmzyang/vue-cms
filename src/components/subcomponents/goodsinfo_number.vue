<template lang="html">
  <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" ref="numBox" @change="countChanged" type="number" value="1" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
      </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  props:['max'],
  mounted(){
    // 初始化数字选择框组件
    mui('.mui-numbox').numbox();
  },
  methods:{
    countChanged(){
      // console.log(this.$refs.numBox.value);
      this.$emit('getcount',parseInt(this.$refs.numBox.value));
    }
  },
  watch:{
    max:function(newVal,oldVal){
      mui(".mui-numbox").numbox().setOption('max',newVal);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
