<template>
  <div id="app" :style="{height: `${height}px`}">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import model from './model/client.model'

export default {
  metaInfo: {
    title: '云惠ITSM云应用平台'
  },
  name: 'APP',
  data () {
    return {
      // 动画
      transitionName: '',
      // 容器高度
      height: 0
    }
  },
  methods: {
    // 获取用户数据和JSSDK
    async getConfigData (json) {
      let res = await model.getConfigData(json)
      const wx = window.wx
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          'chooseImage',
          'uploadImage',
          'getLocation',
          'openLocation'
        ] // 必填，需要使用的JS接口列表
      })
      wx.ready(() => {
        this.getUserLocation(res)
      })
      wx.error((res) => {})
    },
    // 获取当前用户经纬度
    getUserLocation (configData) {
      try {
        const wx = this.$wechat
        wx.getLocation({
          type: 'gcj02',
          success: res => {
            // 31.54889 纬度
            // storage.set('latitude', res.latitude)
            // 120.25469 经度
            // storage.set('longitude', res.longitude)
            this.loginJudge(configData)
          },
          cancel: res => {
            alert(`获取地理位置失败`)
            this.loginJudge(configData)
          },
          // 登录逻辑判断
          async loginJudge (res) {
            // 判断是否绑定平台账号
            if (Number(res.isBinding) === 1) {
              // storage.set('openId', res.snsUserInfo.openId)
              // storage.set('nickname', res.snsUserInfo.nickname)
              // storage.set('headImgUrl', res.snsUserInfo.headImgUrl)
              // storage.set('loginName', res.loginName)
              // 已绑定 自动登录
              let json = {
                loginName: res.loginName,
                openId: res.snsUserInfo.openId,
                isBinding: '1',
                autoLogin: '0',
                ipDesc: '',
                loginType: '2',
                // 经度 纬度
                // location: `${storage.get('longitude', '-1')},${storage.get('latitude', '-1')}`
              }
              let loginRes = await model.login(json)
              if (loginRes.flag) {
                this.$router.replace('/home')
              }
            } else {
              // 未绑定跳转登录
              // storage.set('openId', res.snsUserInfo.openId)
              // storage.set('nickname', res.snsUserInfo.nickname)
              // storage.set('headImgUrl', res.snsUserInfo.headImgUrl)
              this.$router.replace(`/login`)
            }
          }
        })
      } catch (e) {
        alert(`获取经纬度catch`)
        this.loginJudge(configData)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.transitionName = this.$store.state.interlude.direction !== 'forward' ? 'pop-out' : 'pop-in'
    }
  },
  computed: {},
  mounted () {
    this.height = window.innerHeight
    if (window.location.hash === '#/') {
      let url = window.location.search
      if (Number(url.indexOf('?')) !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        this.getConfigData({
          code: strs[0].split('=')[1],
          state: strs[1].split('=')[1],
          url: window.location.href.split('#')[0]
        })
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})

</script>
<style lang="scss" scoped>
  @import "./assets/styles/global";
</style>
