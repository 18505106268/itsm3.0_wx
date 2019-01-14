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
        <img :src="headImgUrl"/>
      </div>
      <!-- 头像 End-->

      <!-- 昵称 Start-->
      <div class="name">{{nickname}}</div>
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
      <van-button type="primary" size="large" :loading="isLoading" @click="unbind">解除</van-button>
    </div>
    <!-- Button End-->
  </div>
</template>

<script>
import { Mixin } from '../../../util/mixin'
import { Button, Notify } from 'vant'
import model from '../../../model/client.model'
import color from '../../../util/color'

import { mapGetters } from 'vuex'

export default {
  name: 'relieve',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Button.name]: Button,
    [Notify.name]: Notify
  },
  data () {
    return {
      // 解绑加载
      isLoading: false
    }
  },
  methods: {
    // 解除绑定
    async unbind () {
      // 阻止多次提交
      this.isLoading = true
      let res = await model.unbind()
      if (!res.errMsg) {
        Notify('解绑成功')
        Notify({ message: '解绑成功', background: color.success })
        setTimeout(() => {
          this.$router.replace(`/login`)
        }, 1000)
      } else {
        this.isLoading = false
        Notify(res.errMsg)
        Notify({ message: res.errMsg, background: color.error })
      }
    }
  },
  mounted () {},
  computed: {
    /**
     * account/headImgUrl 用户经头像
     * account/loginName 用户名
     * account/nickname 用户昵称
     */
    ...mapGetters({
      headImgUrl: 'account/headImgUrl',
      loginName: 'account/loginName',
      nickname: 'account/nickname'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/global";
  @import "relieve";
</style>
