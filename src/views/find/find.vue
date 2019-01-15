<!-- 找回密码 -->
<template>
  <div id="find">
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

    <!-- Foot Start-->
    <div class="foot">
      <img src="../../assets/imgs/foot.png"/>
    </div>
    <!-- Foot End-->
  </div>
</template>

<script>
import { Field, Button, Notify } from 'vant'
import { Mixin } from '../../util/mixin'
import model from '../../model/client.model'
import color from '../../util/color'
import { mapActions } from 'vuex'

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
      // 按钮加载
      isLoading: false,
      // 用户名
      loginName: '18505106268'
    }
  },
  methods: {
    /**
     * account/setServeCode 设置服务端验证码
     * account/setCompanyId 设置企业ID
     */
    ...mapActions(['account/setServeCode', 'account/setCompanyId']),
    // 登录
    async next () {
      // 非空判断
      if (!this.loginName) return Notify({ message: '平台账号不能为空', background: color.warning })
      // 阻止多次提交
      this.isLoading = true
      // 验证用户是否存在
      let existRes = await model.loginNameExist({ loginName: this.loginName })
      // 保存企业ID
      await this['account/setCompanyId'](existRes.id)
      this.isLoading = false
      if (existRes.flag) return Notify({ message: '用户名不存在', background: color.error })
      if (existRes.stop) return Notify({ message: '账号已停用', background: color.error })
      // 发送验证码
      // 阻止多次提交
      this.isLoading = true
      let codeRes = await model.sendVerifyCode({ loginName: this.loginName })
      // 保存服务端验证码
      await this['account/setServeCode'](codeRes.code)
      this.isLoading = false
      // 跳转至下一页
      if (codeRes.flag) { this.$router.push(`/check/${this.loginName}`) }
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "find";
</style>
