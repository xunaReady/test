<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/images/1.jpeg" @click="videoDialogVisible = true">
    <svg-icon icon-class="cancel" style="font-size:24px;color:red;"/>555555
    <awesome-icon name='home fa-lg' style="color:blue;"></awesome-icon>66666
    <el-dialog title="播放视频" :visible.sync="videoDialogVisible">
      <video-player-component></video-player-component>
    </el-dialog>
  </div>
</template>

<script>
import videoPlayerComponent from './videoPlayer'
export default {
  name: 'Home',
  components: {
    videoPlayerComponent
  },
  data () {
    return {
      videoDialogVisible: false
    }
  }
}
</script>
