<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/images/1.jpeg" @click="videoDialogVisible = true">
    <svg-icon icon-class="cancel" style="font-size:24px;color:red;"/>555555
    <awesome-icon name='home fa-lg' style="color:blue;"></awesome-icon>66666
    <el-tree :data="treeDataList" props="{children: 'children',
          label: 'label'}"></el-tree>
    <el-dialog title="播放视频" :visible.sync="videoDialogVisible">
      <video-player-component></video-player-component>
    </el-dialog>
  </div>
</template>
<script>
import { treeData } from '@/assets/js/commonOptions.js'
import videoPlayerComponent from './videoPlayer'
export default {
  name: 'Home',
  components: {
    videoPlayerComponent
  },
  data () {
    return {
      videoDialogVisible: false,
      treeDataList: []
    }
  },
  created () {
    this.treeDataList = treeData.filter(i => {
      i.children = treeData.filter(j => {
        return j.parentId === i.id
      })
      return i.parentId === ''
    })
    console.log('datadata', this.treeDataList)
  }
}
</script>
