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
          <van-button slot="button" size="small" type="primary">重发短信</van-button>
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
      // 短信验证码
      code: '',
      // 重置密码
      password: ''
    }
  },
  methods: {
    async sub () {
      console.log(await 'sub')
    }
  },
  mounted () {
    this.height = window.innerHeight
    console.log('!!!!!!', this.loginName)
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "check";
</style>
