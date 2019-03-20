<!-- 首页 -->
<template>
  <div id="home">
    <!-- 轮播 Start-->
    <div class="swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img width="100%" :src="image"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播 End-->

    <!-- 待办，已办，抄送 Start-->
    <div class="msg">
      <div>
        <transition-group tag="div" name="van-fade" v-show="menuList">
          <div v-for="ml in menuList" :key="ml.id" @click="goList(ml)">
            <span>{{ml.count}}</span>
            <span>{{ml.name}}</span>
          </div>
        </transition-group>
        <span class="loading" v-show="!menuList">
          <van-loading/>
        </span>
      </div>
    </div>
    <!-- 信息 End-->

    <!-- 固定表应用 Start-->
    <div class="container" v-if="false">
      <div class="child">
        <!-- Title Start-->
        <div class="title">常用应用</div>
        <!-- Title End-->

        <!-- List Start-->
        <div class="list">
          <transition-group tag="div" name="van-fade">
            <div v-for="fal in fixedAppList" :key="fal.id" @click="goAppList(fal)">
            <span>
              <img :src="fal.icon"/>
            </span>
              <span>{{fal.appName}}</span>
            </div>
          </transition-group>
          <span class="loading" v-show="!appList">
            <van-loading/>
          </span>
        </div>
        <!-- List End-->
      </div>
    </div>
    <!-- 固定表应用 End-->

    <!-- 项目管理 Start-->
    <div class="container">
      <div class="child">
        <!-- Title Start-->
        <div class="title">应用列表</div>
        <!-- Title End-->

        <!-- List Start-->
        <div class="list">
          <transition-group tag="div" name="van-fade" v-show="appList">
            <div v-for="al in appList" :key="al.id" @click="goAppList(al)">
            <span>
              <img :src="al.icon"/>
            </span>
              <span>{{al.appName}}</span>
            </div>
          </transition-group>
          <span class="loading" v-show="!appList">
            <van-loading/>
          </span>
        </div>
        <!-- List End-->
      </div>
    </div>
    <!-- 项目管理 End-->
  </div>
</template>

<script>
import { Swipe, SwipeItem, Loading } from 'vant'
import { mapMutations } from 'vuex'
import model from '@/model/client.model'
import { Mixin } from '@/util/mixin'
import { PATH, SET_TITLE } from '@/store/types/common'

export default {
  name: 'home',
  metaInfo: {
    title: '云惠ITSM云应用平台'
  },
  mixins: [Mixin],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Loading.name]: Loading
  },
  data () {
    return {
      // 轮播图
      images: [
        'https://img1.mukewang.com/szimg/5c33228b0884a96609000300.jpg',
        'https://img2.mukewang.com/szimg/5c34030108968e3609000300.jpg',
        'https://img2.mukewang.com/szimg/5c34030108968e3609000300.jpg'
      ],
      // 工作台
      menuList: undefined,
      // 应用列表
      appList: undefined,
      // 固定表应用列
      fixedAppList: [{
        appName: '服务请求',
        icon: `${this.imgPath}/views/main/images/infermationdesk.png`,
        id: -1
      }]
    }
  },
  methods: {
    /**
     * common/SET_TITLE 设置HTML Title
     */
    ...mapMutations([
      `${PATH}${SET_TITLE}`
    ]),
    // 获取用户待办，处理，抄送
    async getLeftMenu () {
      let res = await model.getLeftMenu({ appId: -1 })
      this.menuList = res.menuList
    },
    // 获取应用列表
    async getApplicationList () {
      let res = await model.getApplicationList()
      if (res.flag) {
        this.appList = res.appList.map(item => {
          // this.imgPath
          item.icon = this.imgPath + item.icon
          return item
        })
      }
    },
    // 去表单列表
    goAppList (item) {
      if (item.appType) {
        // 设置HTML Title
        this[`${PATH}${SET_TITLE}`](item.appName)
        this.$router.push(`/menuList/${item.id}`)
      } else {
        this[`${PATH}${SET_TITLE}`](item.appName)
        this.$router.push('/request')
      }
    },
    // 去列表
    goList (ml) {
      // 设置HTML Title
      let index = ml.url.lastIndexOf('/')
      let url = ml.url.substring(index + 1, ml.url.length)
      this[`${PATH}${SET_TITLE}`](ml.name)
      this.$router.push(`/agenda/${url.replace(/\?/g, '_')}`)
    }
  },
  mounted () {
    // 获取用户待办，处理，抄送
    this.getLeftMenu()
    // 获取应用列表
    this.getApplicationList()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "home";
</style>
