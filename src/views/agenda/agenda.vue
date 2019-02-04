<!-- 待办，已办 列表 -->
<template>
  <div id="agenda">

    <!-- Tab Start -->
    <van-tabs v-model="active" :color="blue" ellipsis @click="tabClick">
      <van-tab :title="al.appName" v-for="al in appList" :key="al.id" class="tab">
      </van-tab>
    </van-tabs>
    <!-- End Start -->

    <!-- List Start -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getUndoOrDone()">

      <!-- List Start -->
      <div class="agenda-list" v-for="al in agendaList" :key="al.recoId" @click="goAgendaDetail(al)">
        <div>
          <span class="font-grey">{{al.menuName}}</span>
          <span class="font-grey">{{al.createTime}}</span>
        </div>
        <div>
          <span>{{al.taskSubject}}</span>
          <span class="font-grey">来自于 {{al.userName}}</span>
        </div>
        <div>
          <b>{{al.appName}}</b>
        </div>
      </div>
      <!-- List End -->

    </van-list>
    <!-- List End-->

  </div>
</template>

<script>
import { Tab, Tabs, List } from 'vant'
import { mapGetters } from 'vuex'
import { Mixin } from '@/util/mixin'
import model from '@/model/client.model'
import color from '@/util/color'

export default {
  name: 'agenda',
  props: ['ids'],
  metaInfo () {
    return {
      title: this['common/title']
    }
  },
  mixins: [Mixin],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List
  },
  data () {
    return {
      agendaJson: {
        appId: -1,
        appIdArr: '',
        choose: 0,
        startTime: '',
        endTime: '',
        condition: ''
      },
      // 应用列表
      appList: [],
      // 列表
      agendaList: undefined,
      // 当前选中项
      active: 0,
      // 加载
      loading: false,
      // 加载完成
      finished: false,
      // tab颜色
      blue: color.blue
    }
  },
  methods: {
    // 获取应用列表
    async getApplicationList () {
      let res = await model.getApplicationList()
      if (res.flag) {
        res.appList.unshift({
          id: 0,
          appName: '全部'
        })
        this.appList = res.appList
      }
    },
    // 获取我的待办列表
    async getUndoOrDone (id) {
      // 清除底部提示
      this.finished = false
      // 开启加载提示
      this.loading = true
      // 清空历史数据
      this.agendaList = []
      let idsArr = this.ids.split('_')
      let res = {}
      // 默认为查询全部，不传入appId
      this.agendaJson.appId = !id ? idsArr[1].split('=')[1] : id
      this.agendaJson.appIdArr = !id ? idsArr[1].split('=')[1] : id
      switch (idsArr[0]) {
        case 'doing':
          this.agendaJson.choose = -2
          res = await model.undoOrDone(this.agendaJson)
          break
        case 'done':
          this.agendaJson.choose = -3
          res = await model.undoOrDone(this.agendaJson)
          break
        case 'info':
          this.agendaJson.choose = -4
          res = await model.undoOrDone(this.agendaJson)
          res.data = res.data.map(item => {
            item.taskSubject = item.msgContent
            return item
          })
          break
      }
      // 关闭加载
      this.loading = false
      // 显示底部提示
      this.finished = true
      this.agendaList = res.data
    },
    // 列表去详情
    async goAgendaDetail (al) {
      // formId_nodeId_pcId_processId_appId_roleId_keyId_isHandle
      // keyId = pcId
      let ids = `${al.cfrm_id}_${al.nodeId}_${al.keyId}_${al.processId}_${al.appId}_${al.roleId}_${al.keyId}_1`
      this.$router.push(`/progressDetail/${ids}`)
    },
    // tab切换事件
    tabClick (index) {
      // 当前模块下标
      this.getUndoOrDone(this.appList[index].id)
    }
  },
  mounted () {
    this.getApplicationList()
  },
  computed: {
    /**
     * common/title Html Title
     */
    ...mapGetters(['common/title'])
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "agenda";
</style>
