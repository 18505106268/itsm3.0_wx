<!-- 验证并重置 -->
<template>
  <div id="check">
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
        <van-field v-model="code" :disabled="isLoading" type="tel" placeholder="请填写验证码">
          <van-button slot="button" size="small" type="primary" :disabled="msgLoading" :loading="msgAsyncLoading"
                      @click="resend">{{msg}}
          </van-button>
        </van-field>
      </div>
      <div>
        <van-field v-model="password" :disabled="isLoading" placeholder="输入重置密码"/>
      </div>
    </div>
    <!--Form End-->

    <!--Button Start-->
    <div class="sub">
      <van-button type="primary" size="large" :loading="isLoading" @click="sub">完成</van-button>
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
import { mapGetters, mapActions } from 'vuex'

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
      // 按钮加载
      isLoading: false,
      // 验证码按钮
      msgLoading: true,
      // 验证码异步按钮
      msgAsyncLoading: false,
      // 短信验证码
      code: '',
      // 重置密码
      password: '',
      // 倒计时
      msg: ''
    }
  },
  methods: {
    /**
     * account/setServeCode 设置服务端验证码
     */
    ...mapActions(['account/setServeCode']),
    // 倒计时
    countDown () {
      this.msg = 60
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
      // 保存服务端验证码
      await this['account/setServeCode'](res.code)
      this.msgAsyncLoading = false
      this.msgLoading = true
      this.countDown()
    },
    // 完成提交
    async sub () {
      if (this['account/serveCode'] !== this.code) return Notify('验证码错误')
      if (!this.password) return Notify('请输入重置密码')
      this.isLoading = true
      // 重置密码
      let res = await model.resetPassword({ id: this['account/companyId'], password: this.password })
      if (res.flag) {
        Notify({
          message: '密码修改成功',
          background: color.blue
        })
        setTimeout(() => {
          this.$router.replace(`/login`)
        }, 500)
      } else {
        Notify('ERROR')
      }
    }
  },
  mounted () {
    this.countDown()
  },
  computed: {
    /**
     * common/serveCode 服务端验证码
     * account/companyId 企业ID
     */
    ...mapGetters(['account/serveCode', 'account/companyId'])
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "check";
</style>
