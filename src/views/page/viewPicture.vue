<template>
  <!-- 图片预览、放大、缩小、翻转demo -->
  <viewer>
    <div v-for="(item,index) in images" :key="index">
      <img :src="item.src">
    </div>
  </viewer>        
</template>
<script>
import Vue from 'vue'
// 预览图片组件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Viewer.setDefaults({
  Options: {
    inline: false,
    button: true,
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 1,
      reset: 1,
      prev: 0,
      play: 1,
      next: 0,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 1,
      flipVertical: 1
    },
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: false,
    keyboard: true,
    url: 'data-source'
  }
})
Vue.use(Viewer)
export default {
  name: 'Picture',
  data() {
    return {
      images: [
        { src: require('../../assets/images/1.jpeg') },
        { src: require('../../assets/images/2.jpg') },
        { src: require('../../assets/images/3.jpg') },
        { src: require('../../assets/images/4.jpg') }
      ]
    }
  }
}
</script>
