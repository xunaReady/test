<template>
  <div class="about">
    <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri" />
    <div v-for="(item,index) in data" :key="index">
      {{ item.id }}
    </div>
  </div>
</template>
<script>
import wxlogin from 'vue-wxlogin'
export default {
  name: 'Index',
  components: {
    wxlogin
  },
  data() {
    return {
      appid: 'wx4c6b4defdb847326',
      scope: 'snsapi_login',
      redirect_uri: 'https://abstest.tenpay.com/abs/author/callBack.do',
      data: []
    }
  },
  created() {
    console.log(window.location.protocol + window.location.host + '/#/')
  },
  methods: {
  }

}
</script>
