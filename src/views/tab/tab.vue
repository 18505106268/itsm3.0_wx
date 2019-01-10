<!-- 底部导航页  -->
<template>
  <div id="tab">
    <router-view></router-view>
    <!-- 底部导航 Start-->
    <div class="tab">
      <van-tabbar :fixed="true" v-model="active">
        <van-tabbar-item icon="home-o" to="/tab/home">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/tab/info/relieve">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 底部导航 End-->
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'tab',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
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
  @import "tab";
</style>
