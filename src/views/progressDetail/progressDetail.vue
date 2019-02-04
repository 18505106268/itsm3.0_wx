<!-- 处理，查看 -->
<template>
  <div id="progressDetail">

    <!-- Tab Start -->
    <van-tabs type="card" :color="blue" @click="tabClick">
      <van-tab title="详情"></van-tab>
      <van-tab title="处理流程"></van-tab>
    </van-tabs>
    <!-- Tab End-->

    <!-- 表单 Start -->
    <div class="form-list" v-show="tabIndex === 0">
      <create-dynamic-forms :processJson="processJson" ref="createDynamicForms"></create-dynamic-forms>
    </div>
    <!-- 表单 End-->

    <!-- 处理流程 Start -->
    <div class="info" v-show="tabIndex === 1">
      处理流程
    </div>
    <!-- 处理流程 End-->

  </div>
</template>

<script>
import CreateDynamicForms from '@/components/dynamicForms/createDynamicForms'
import { Tab, Tabs } from 'vant'
import { Mixin } from '../../util/mixin'
import color from '@/util/color'

export default {
  name: 'progressDetail',
  metaInfo: {
    title: '处理'
  },
  props: ['ids'],
  mixins: [Mixin],
  components: {
    CreateDynamicForms: CreateDynamicForms,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      // 判断是否是处理
      isHandle: false,
      // 处理流程所需参数
      processJson: {
        roleId: -1
      },
      // tab颜色
      blue: color.blue,
      // 显示模块
      tabIndex: 0
    }
  },
  methods: {
    // tab切换事件
    tabClick (index) {
      // 当前模块下标
      this.tabIndex = index
    }
  },
  mounted () {
    // formId_nodeId_pcId_processId_appId_roleId_keyId_isHandle
    let ids = this.ids.split('_')
    this.processJson.formId = ids[0]
    this.processJson.nodeId = ids[1]
    this.processJson.pcId = ids[2]
    this.processJson.processId = ids[3]
    this.processJson.appId = ids[4]
    this.processJson.roleId = ids[5]
    this.processJson.keyId = ids[6]
    this.isHandle = ids[7]
    this.$nextTick(() => {
      this.$refs.createDynamicForms.handleData()
    })
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "progressDetail";
</style>
