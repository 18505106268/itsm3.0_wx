<template>
  <div id="app" :style="{height: `${height}px`}">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import model from './model/client.model'
import { mapMutations, mapGetters } from 'vuex'
import { PATH, SET_OPEN_ID, SET_LOCATION, SET_NICKNAME, SET_HEAD_IMG_URL, SET_LOGIN_NAME } from './store/types/account'

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})

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
      height: 0,
      // 微信对象
      wx: undefined
    }
  },
  methods: {
    /**
     * account/setOpenId 设置用户openID
     * account/setLocation 设置用户经纬度
     * account/setNickname 设置用户昵称
     * account/setHeadImgUrl 设置用户头像
     * account/setLoginName 设置用户名
     */
    ...mapMutations([
      `${PATH}${SET_OPEN_ID}`,
      `${PATH}${SET_LOCATION}`,
      `${PATH}${SET_NICKNAME}`,
      `${PATH}${SET_HEAD_IMG_URL}`,
      `${PATH}${SET_LOGIN_NAME}`
    ]),
    // 获取用户数据和JSSDK
    async getConfigData (json) {
      // 获取微信配置信息
      let res = await model.getConfigData(json)
      this.wx.config({
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: true,
        // 必填，公众号的唯一标识
        appId: res.appId,
        // 必填，生成签名的时间戳
        timestamp: res.timestamp,
        // 必填，生成签名的随机串
        nonceStr: res.nonceStr,
        // 必填，签名
        signature: res.signature,
        // 必填，需要使用的JS接口列表
        jsApiList: ['chooseImage', 'uploadImage', 'getLocation', 'openLocation']
      })
      // 当配置完成是触发
      this.wx.ready(() => {
        this.getUserLocation(res)
      })
      // 出错时触发
      this.wx.error((res) => { alert(`this.wx.error === > ${JSON.stringify(res)}`) })
    },
    // 获取当前用户经纬度
    getUserLocation (configData) {
      try {
        this.wx.getLocation({
          type: 'gcj02',
          success: res => {
            /**
             * 经度 longitude
             * 纬度 latitude
             * 保存用户经纬度
             */
            alert('getUserLocation success')
            this[`${PATH}${SET_LOCATION}`](`${res.longitude},${res.latitude}`)
            this.loginJudge(configData)
          },
          cancel: res => {
            alert(`获取地理位置失败`)
            this.loginJudge(configData)
          }
        })
      } catch (e) {
        alert(`获取经纬度 err`)
        this.loginJudge(configData)
      }
    },
    // 登录逻辑判断
    async loginJudge (res) {
      // 保存用户openId
      this[`${PATH}${SET_OPEN_ID}`](res.snsUserInfo.openId)
      // 保存用户昵称
      this[`${PATH}${SET_NICKNAME}`](res.snsUserInfo.nickname)
      // 保存用户头像
      this[`${PATH}${SET_HEAD_IMG_URL}`](res.snsUserInfo.headImgUrl)
      // 保存用户名
      this[`${PATH}${SET_LOGIN_NAME}`](res.loginName)
      // 判断是否绑定平台账号
      if (Number(res.isBinding) === 1) {
        // 已绑定 自动登录
        let json = {
          loginName: res.loginName,
          openId: res.snsUserInfo.openId,
          isBinding: '1',
          autoLogin: '0',
          ipDesc: '',
          loginType: '2',
          location: this['account/location']
        }
        let loginRes = await model.login(json)
        if (loginRes.flag) {
          this.$router.replace('/tab/home')
        }
      } else {
        this.$router.replace(`/login`)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.transitionName = this.$store.state.interlude.direction !== 'forward' ? 'pop-out' : 'pop-in'
      this.height = window.innerHeight
    }
  },
  computed: {
    /**
     * account/location 用户经纬度
     */
    ...mapGetters(['account/location'])
  },
  mounted () {
    this.height = window.innerHeight
    this.wx = window.wx
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
</script>
<style lang="scss" scoped>
  @import "./assets/styles/global";
</style>
