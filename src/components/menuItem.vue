<template>
  <div>
    <div v-for="(item,index) in menuOptions"
      :key="index">
      <el-submenu v-if="item.children && item.children.length"
        :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <menu-item :menuOptions="item.children"></menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: ['menuOptions']
}
</script>
<style scoped lang="scss">

</style>
