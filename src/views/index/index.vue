<template>
  <div id="app" style="height: 100%;">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/videoPlayer">video-player</router-link> |
      <router-link to="/viewDoc">viewDoc</router-link> |
      <router-link to="/viewPicture">viewPicture(王一博图片集)</router-link>
    </div>
    <div style="height:calc(100% - 82px);overflow-y:auto;">
      <router-view style="height:100%;"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
