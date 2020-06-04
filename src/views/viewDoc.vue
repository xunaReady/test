<template>
    <viewer>
        <div v-for="(item,index) in images" :key="index">
            <img :src="item.src"/>
        </div>
        <iframe src="http://dl.caishui.aisino.com/axh/static/help/%E9%87%91%E7%A8%8E%E7%9B%98%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.htm" style="width:100%;height:100%;"></iframe>
    </viewer>
</template>
<script>
export default {
  name: 'html',
  data () {
    return {
      images: [
        { src: 'http://dl.caishui.aisino.com/axh/static/app/image/znspbm.png' },
        { src: 'http://dl.caishui.aisino.com/axh/static/app/image/qymp101.png' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
iframe{
    border-width: 0px;
}
</style>
