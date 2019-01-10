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
    <div class="msg" v-for="i in 10" :key="i">
      <div>
        <div>
          <span>{{i}}</span>
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

    <!-- 底部导航 Start-->
    <div class="tab">
      <van-tabbar :fixed="true" v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 底部导航 End-->
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'
import { Swipe, SwipeItem, Tabbar, TabbarItem } from 'vant'

export default {
  name: 'home',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      // 轮播图
      images: [
        'https://img1.mukewang.com/szimg/5c33228b0884a96609000300.jpg',
        'https://img2.mukewang.com/szimg/5c34030108968e3609000300.jpg',
        'https://img2.mukewang.com/szimg/5c34030108968e3609000300.jpg'
      ],
      // TAB当前选中项
      active: 0
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
