<template>
  <el-container id="app">
    <el-aside id="nav">
      <div class="logo flex-row-center">
        <img :src="require('@/assets/images/1.jpg')">
      </div>
      <el-menu
        ref="menuSign"
        class="main-menu-class"
        background-color="#214077"
        active-text-color="#ffffff"
        text-color="#999999"
        :default-active="activeMenu"
        :unique-opened="false"
        router
      >
        <menu-item-component :menu-options="menuOptions" />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <div>练习demo</div>
      </el-header>
      <el-main style="height:calc(100% - 60px);padding:0;overflow:hidden;">
        <div style="height:100%;overflow-y:auto;" class="main-wrapper">
          <router-view style="height: calc(100% - 40px);padding:20px;" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { menuConfig } from '@/router/menuConfig'
import MenuItemComponent from '@/components/menuItem.vue'
import { Base64 } from 'js-base64'
import util from '@/libs/util.js'

export default {
  name: 'Index',
  components: {
    MenuItemComponent
  },
  data() {
    return {
      menuOptions: menuConfig,
      activeMenu: ''
    }
  },
  watch: {
    '$route.matched': {
      handler(val) {
        this.activeMenu = val[val.length - 1].path
        this.$nextTick(() => {
          if (this.menuOptions.length > 0 && this.$refs.menuSign) {
            this.$refs.menuSign.activeIndex = this.activeMenu
          }
        })
      },
      immediate: true
    }
  },
  created() {
    const token = Base64.decode(util.cookies.get('token'))
    console.log((new Date()).valueOf(), token, this.$moment(1616654008).format('YYYY-MM-DD'))
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  overflow: hidden;
  #nav {
    background-color: #214077;
    width: 200px !important;
    padding: 0px;
    .logo {
      padding: 20px 20px 10px;
      img {
        border-radius: 50%;
        width: 120px;
        height: 120px;
      }
    }
    .main-menu-class{
      height:calc( 100% - 180px);
      overflow-y: auto;
      padding: 10px 0 20px;
      border:none;
    }
  }
  .main-header{
    background-color: #ffffff;
    box-shadow: 5px 9px 32px 2px rgba(23, 63, 224, 0.08);
    height: 60px !important;
    line-height: 60px !important;
  }
  .main-wrapper{
    &::-webkit-scrollbar {
      width: 8px;
      /*滚动条宽度*/
      height: 8px;
      /*滚动条高度*/
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      /*滚动条的背景区域的圆角*/
      background-color: #e3e3e3;
      /*滚动条的背景颜色*/
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      /*滚动条的圆角*/
      background-color: #ccc;
      /*滚动条的背景颜色*/
    }
  }
}
</style>
