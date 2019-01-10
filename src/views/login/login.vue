<!-- 登录 -->
<template>
  <div id="login">
    <!--Title Start-->
    <div class="title">
      欢迎来到云惠ITSM
    </div>
    <!--Title End-->

    <!--Form Start-->
    <div class="form">
      <div>
        <span>+86</span>
        <span>
          <van-field v-model="loginName" type="tel" placeholder="请输入手机号" :disabled="isLoading"/>
        </span>
      </div>
      <div>
        <van-field v-model="password" type="password" placeholder="请输入密码" :disabled="isLoading"/>
      </div>
    </div>
    <!--Form End-->

    <!-- FindPwd Start-->
    <div class="find">
      <span @click="find">忘记密码</span>
    </div>
    <!-- Find End-->

    <!--Button Start-->
    <div class="sign-in">
      <van-button type="primary" size="large" :loading="isLoading" @click="goSub">登录</van-button>
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

export default {
  name: 'login',
  metaInfo: {
    title: '登录'
  },
  mixins: [Mixin],
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Notify.name]: Notify
  },
  data () {
    return {
      // 手机号
      loginName: '18505106268',
      // 密码
      password: '123',
      // 按钮加载
      isLoading: false
    }
  },
  methods: {
    // 登录
    async goSub () {
      // 非空判断
      if (!this.loginName) return Notify('平台账号不能为空')
      if (!this.password) return Notify('密码不能为空')
      // 阻止多次提交
      this.isLoading = true
      // 验证用户是否存在
      let existRes = await model.loginNameExist({ loginName: this.loginName })
      this.isLoading = false
      if (existRes.flag) return Notify('用户名不存在')
      if (existRes.stop) return Notify('账号已停用')
      let json = {
        loginName: this.loginName,
        password: this.password,
        autoLogin: '0',
        ipDesc: '',
        loginType: '2',
        isBinding: '0'
        // openId: storage.get('openId', '-1'),
        // 经度 纬度
        // location: `${storage.get('longitude', '-1')},${storage.get('latitude', '-1')}`
      }
      this.isLoading = true
      let loginRes = await model.login(json)
      this.isLoading = false
      if (!loginRes.flag) return Notify('登录失败,用户名与密码不匹配')
      this.$router.replace('/home')
    },
    // 忘记密码
    find () {
      this.$router.push(`/find`)
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "login";
</style>
