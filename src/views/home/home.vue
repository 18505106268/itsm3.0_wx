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

    <!-- 信息 Start-->
    <div class="msg">
      <div>
        <div>
          <span>0</span>
          <span>我的待办</span>
        </div>
        <div>
          <span>0</span>
          <span>我的已办</span>
        </div>
        <div>
          <span>0</span>
          <span>我的消息</span>
        </div>
      </div>
    </div>
    <!-- 信息 End-->

    <!-- 项目管理 Start-->
    <div class="container">
      <div class="child">
        <!-- Title Start-->
        <div class="title">项目管理</div>
        <!-- Title End-->

        <!-- List Start-->
        <div class="list">
          <div v-for="i in 6" :key="i">
            <span>
              <img src="http://itss-china.cn/views/main/images/notice.png"/>
            </span>
            <span>工单管理</span>
          </div>
        </div>
        <!-- List End-->
      </div>
    </div>
    <!-- 项目管理 End-->
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'
import { Swipe, SwipeItem } from 'vant'

export default {
  name: 'home',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data () {
    return {
      // 轮播图
      images: [
        'https://img1.mukewang.com/szimg/5c33228b0884a96609000300.jpg',
        'https://img2.mukewang.com/szimg/5c34030108968e3609000300.jpg',
        'https://img2.mukewang.com/szimg/5c34030108968e3609000300.jpg'
      ]
    }
  },
  methods: {},
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "home";
</style>
