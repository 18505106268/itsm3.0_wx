<!--登录-->
<template>
  <div id="login">
    <van-button type="default">{{login}}</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  name: 'login',
  metaInfo: {
    title: '登录'
  },
  components: {
    [Button.name]: Button
  },
  data () {
    return {
      login: '登录'
    }
  },
  methods: {},
  mounted () {
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "login.scss";
</style>
