<!--登录-->
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
          <van-field
            v-model="phone"
            type="tel"
            placeholder="请输入手机号"
          />
        </span>
      </div>
      <div>
        <van-field
          v-model="password"
          type="password"
          placeholder="请输入密码"
        />
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
      <van-button type="primary" size="large" :loading="false">登录</van-button>
    </div>
    <!-- Button End-->
  </div>
</template>

<script>
import { Field, Button } from 'vant'
import { Mixin } from '../../util/mixin'

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
      login: '登录',
      phone: '',
      password: ''
    }
  },
  methods: {},
  mounted () {
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "login";
</style>
