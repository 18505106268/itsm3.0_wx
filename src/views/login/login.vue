<!--登录-->
<template>
  <div id="login" :style="{height: `${height}px`}">
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
          <van-field v-model="loginName" type="tel" placeholder="请输入手机号"/>
        </span>
      </div>
      <div>
        <van-field v-model="password" type="password" placeholder="请输入密码"/>
      </div>
    </div>
    <!--Form End-->

    <!-- FindPwd Start-->
    <div class="find">
      <span>忘记密码</span>
    </div>
    <!-- Find End-->

    <!--Button Start-->
    <div class="sign-in">
      <van-button type="primary" size="large" :loading="false" @click="goSub">登录</van-button>
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
import { Field, Button } from 'vant'
import { Mixin } from '../../util/mixin'

import {
  mapActions
} from 'vuex'

export default {
  name: 'login',
  metaInfo: {
    title: '登录'
  },
  mixins: [Mixin],
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      // 容器高度
      height: 0,
      // 手机号
      loginName: '18505016268',
      // 密码
      password: 'nct123456'
    }
  },
  methods: {
    ...mapActions(['user/loginNameExist', 'user/login']),
    async goSub () {
      console.log('goSub')
      try {
        if (!this.loginName) return console.log('平台账号不能为空')
        if (!this.password) return console.log('密码不能为空')
        let existRes = await this['user/loginNameExist']({ loginName: this.loginName })
        if (existRes.flag) return console.log('用户名不存在')
        if (existRes.stop) return console.log('账号已停用')
        let json = {
          loginName: this.loginName,
          password: this.password,
          autoLogin: '0',
          ipDesc: '',
          loginType: '2',
          isBinding: '0'
        }
        console.log(json)
      } catch (e) {
        console.log('catch')
      }
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
  @import "login";
</style>
