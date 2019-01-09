<!-- 找回密码 -->
<template>
  <div id="find" :style="{height: `${height}px`}">
    <!--Title Start-->
    <div class="title">
      找回密码
    </div>
    <!--Title End-->

    <!--Form Start-->
    <div class="form">
      <div>
        <span>+86</span>
        <span>
          <van-field type="tel" v-model="loginName" placeholder="请输入手机号" :disabled="isLoading"/>
        </span>
      </div>
    </div>
    <!--Form End-->

    <!--Button Start-->
    <div class="sign-in">
      <van-button type="primary" size="large" :loading="isLoading" @click="next">下一步</van-button>
    </div>
    <!-- Button End-->
  </div>
</template>

<script>
import { Field, Button, Notify } from 'vant'
import { Mixin } from '../../util/mixin'
import model from '../../model/client.model'

export default {
  name: 'find',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Notify.name]: Notify
  },
  data () {
    return {
      // 容器高度
      height: 0,
      // 按钮加载
      isLoading: false,
      // 用户名
      loginName: '18505016268'
    }
  },
  methods: {
    // 登录
    async next () {
      // 非空判断
      if (!this.loginName) return Notify('平台账号不能为空')
      // 阻止多次提交
      this.isLoading = true
      // 验证用户是否存在
      let existRes = await model.loginNameExist({ loginName: this.loginName })
      this.isLoading = false
      if (existRes.flag) return Notify('用户名不存在')
      if (existRes.stop) return Notify('账号已停用')
      await model.sendVerifyCode({ loginName: this.loginName })
      this.$router.push(`/check/${this.loginName}`)
    }
  },
  mounted () {
    this.height = window.innerHeight
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "find";
</style>
