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
import color from '../../util/color'
import { mapGetters, mapMutations } from 'vuex'
import { PATH, SET_LOGIN_NAME } from '../../store/types/account'

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
      loginName: 'guf',
      // 密码
      password: 'yy123456',
      // 按钮加载
      isLoading: false
    }
  },
  methods: {
    /**
     * account/setLoginName 设置用户名
     */
    ...mapMutations([
      `${PATH}${SET_LOGIN_NAME}`
    ]),
    // 登录
    async goSub () {
      // 非空判断
      if (!this.loginName) return Notify({ message: '平台账号不能为空', background: color.warning })
      if (!this.password) return Notify({ message: '密码不能为空', background: color.warning })
      // 阻止多次提交
      this.isLoading = true
      // 验证用户是否存在
      let existRes = await model.loginNameExist({ loginName: this.loginName })
      this.isLoading = false
      if (existRes.flag) return Notify({ message: '用户名不存在', background: color.error })
      if (existRes.stop) return Notify({ message: '账号已停用', background: color.error })
      let json = {
        loginName: this.loginName,
        password: this.password,
        autoLogin: '0',
        ipDesc: '',
        loginType: '2',
        isBinding: '0',
        openId: this['account/openId'],
        location: this['account/location']
      }
      this.isLoading = true
      let loginRes = await model.login(json)
      if (!loginRes.flag) {
        Notify({ message: '登录失败,用户名与密码不匹配', background: color.error })
        this.isLoading = false
        return false
      }
      // 保存用户名
      this[`${PATH}${SET_LOGIN_NAME}`](json.loginName)
      this.$router.replace('/tab/home')
    },
    // 忘记密码
    find () {
      this.$router.push(`/find`)
    }
  },
  mounted () {},
  computed: {
    /**
     * account/location 用户经纬度
     * account/openId 用户openId
     */
    ...mapGetters(['account/location', 'account/openId'])
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "login";
</style>
