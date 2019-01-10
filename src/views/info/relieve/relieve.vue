<!-- 解除绑定 -->
<template>
  <div id="relieve">
    <!-- Title Start-->
    <div class="title">解除绑定</div>
    <!-- Title End-->

    <!-- 微信信息 Start-->
    <div>
      <!-- 头像 Start-->
      <div class="head">
        <img src="https://img1.mukewang.com/533e505f00011ad102000200-140-140.jpg"/>
      </div>
      <!-- 头像 End-->

      <!-- 昵称 Start-->
      <div class="name">Mr牛牛</div>
      <!-- 昵称 End-->
    </div>
    <!-- 微信信息 End-->

    <!-- Field Start-->
    <div class="field">
      <div>
        <span>平台账号</span>
        <span>{{loginName}}</span>
      </div>
    </div>
    <!-- Field End-->

    <!--Button Start-->
    <div class="relieve-btn">
      <van-button type="primary" size="large" :loading="isLoading" @click="relieve">解除</van-button>
    </div>
    <!-- Button End-->
  </div>
</template>

<script>
import { Mixin } from '../../../util/mixin'
import { Button } from 'vant'

export default {
  name: 'relieve',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Button.name]: Button
  },
  data () {
    return {
      loginName: '18505106268',
      // 解绑加载
      isLoading: false
    }
  },
  methods: {
    // 解除绑定
    relieve () {
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/global";
  @import "relieve";
</style>
