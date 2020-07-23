<template>
<!-- 图片预览、放大、缩小、翻转demo -->
    <viewer>
        <div v-for="(item,index) in images" :key="index">
            <img :src="item.src"/>
        </div>
    </viewer>
</template>
<script>
export default {
  name: 'Picture',
  data () {
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
