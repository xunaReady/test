<template>
  <div style="height:100%;overflow-y:hidden;">
    <!-- 查看网页demo -->
    <iframe :src="htmlSrc" style="width:100%;height:100%;" />
  </div>
</template>
<script>
export default {
  name: 'Html',
  data() {
    return {
      htmlSrc: 'https://baike.baidu.com/item/%E7%8E%8B%E4%B8%80%E5%8D%9A/15818247?fr=aladdin'
    }
  }
}
</script>
<style lang="scss" scoped>
iframe{
    border-width: 0px;
}
</style>
