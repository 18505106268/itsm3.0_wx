<!-- 验证并重置 -->
<template>
  <div id="check" :style="{height: `${height}px`}">
    <!--Title Start-->
    <div class="title">
      找回密码
    </div>
    <!--Title End-->

    <!--Tip Start-->
    <div class="tip">
      短信验证码已发送至+86 {{loginName}}
    </div>
    <!--Tip End-->

    <!--Form Start-->
    <div class="form">
      <div>
        <van-field v-model="code" type="tel" placeholder="请填写验证码">
          <van-button slot="button" size="small" type="primary" :disabled="msgLoading" :loading="msgAsyncLoading"
                      @click="resend">{{msg}}
          </van-button>
        </van-field>
      </div>
      <div>
        <van-field v-model="password" placeholder="输入重置密码"/>
      </div>
    </div>
    <!--Form End-->

    <!--Button Start-->
    <div class="sub">
      <van-button type="primary" size="large" :loading="isLoading" @click="sub">完成</van-button>
    </div>
    <!-- Button End-->
  </div>
</template>

<script>
import { Field, Button, Notify } from 'vant'
import { Mixin } from '../../util/mixin'
import model from '../../model/client.model'

export default {
  name: 'check',
  metaInfo: {
    title: ''
  },
  props: ['loginName'],
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
      // 验证码按钮
      msgLoading: true,
      // 验证码异步按钮
      msgAsyncLoading: false,
      // 服务端验证码
      serveCode: '',
      // 短信验证码
      code: '',
      // 重置密码
      password: '',
      // 倒计时
      msg: ''
    }
  },
  methods: {
    // 倒计时
    countDown () {
      this.msg = 5
      let timer = setInterval(() => {
        this.msg--
        if (this.msg === 0) {
          this.msgLoading = false
          this.msg = '重新发送'
          clearInterval(timer)
        }
      }, 1000)
    },
    // 重新发送
    async resend () {
      this.msgAsyncLoading = true
      // 发送验证码
      let res = await model.sendVerifyCode({ loginName: this.loginName })
      console.log(res)
      if (res.flag) { this.serveCode = res.code }
      this.msgAsyncLoading = false
      this.msgLoading = true
      this.countDown()
    },
    // 完成提交
    async sub () {
      if (this.serveCode === this.code) {

      }
    }
  },
  mounted () {
    this.height = window.innerHeight
    this.countDown()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "check";
</style>
