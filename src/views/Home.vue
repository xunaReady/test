<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="videoDialogVisible = true">
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
