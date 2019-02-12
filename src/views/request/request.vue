<!-- 服务请求 -->
<template>
  <div id="request">

    <!-- Title Start -->
    <div class="title">
      <span class="more" @click="more">更多</span>
    </div>
    <!-- Title End -->

    <!-- List Start -->
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getServersDesk()">

        <!-- List Start -->
        <div class="request-list" v-for="rl in requestList" :key="rl.serversDeskId">
          <div>
            <span class="font-grey" :style="{color: rl.levelColor}">{{rl.serversCode}}</span>
            <span class="font-grey">{{rl.createTime}}</span>
          </div>
          <div>
            <span>{{rl.createUser}}</span>
            <span class="font-grey">{{rl.requestName}}</span>
          </div>
          <div>
            <b>{{rl.serversStateDesc}}</b>
          </div>
        </div>
        <!-- List End -->

      </van-list>
    </div>
    <!-- List End-->

    <!-- 上拉菜单 Start -->
    <van-actionsheet v-model="show" :actions="actions" @select="onSelect"/>
    <!-- 上拉菜单 End -->
  </div>
</template>

<script>
import { Mixin } from '@/util/mixin'
import { List, Actionsheet } from 'vant'
import model from '@/model/client.model'

export default {
  name: 'request',
  metaInfo: {
    title: '服务请求'
  },
  mixins: [Mixin],
  components: {
    [List.name]: List,
    [Actionsheet.name]: Actionsheet
  },
  data () {
    return {
      // 服务请求列表
      requestList: [],
      // 加载
      loading: false,
      // 加载完成
      finished: false,
      // 分页起始位置
      start: 0,
      // 是否显示上拉菜单
      show: false,
      actions: [
        {
          name: '新增',
          loading: false,
          to: '/addRequest'
        }
      ]
    }
  },
  methods: {
    // 获取服务请求列表
    async getServersDesk () {
      // 清除底部提示
      this.finished = false
      // 开启加载提示
      this.loading = true
      // 清空历史数据
      let res = await model.getServersDesk({
        menuId: 21,
        start: this.start
      })
      if (res.data.length !== 0) {
        this.requestList = [...this.requestList, ...res.data]
        this.start += 10
      } else {
        // 显示底部提示
        this.finished = true
      }
      // 关闭加载
      this.loading = false
    },
    // 更多
    more () {
      this.show = true
    },
    // 上拉菜单选中后回调
    onSelect (item) {
      this.$router.push(item.to)
    }
  },
  mounted () {
    this.getServersDesk()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "request";
</style>
