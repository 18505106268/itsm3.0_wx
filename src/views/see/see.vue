<!-- 查看列表 -->
<template>
  <div id="see">
    <!-- 列表区域 Start -->
    <div class="progress-query-block">

      <!-- List Start -->
      <div class="list">
        <transition-group tag="div" name="van-fade">
          <div v-for="pl in processList" class="progress-query-item" @click="goProgressDetail(pl)" :key="pl.pc_id">
            <div>
              <span>{{pl.cfrm_seq}}</span>
              <span>{{pl.cd_createtime}}</span>
            </div>
            <div>
              <span>{{pl.subjectdesc}}</span>
            </div>
            <div>
              <span>{{pl.user_do}}</span>
              <span>{{pl.cfrm_status}}</span>
            </div>
          </div>
        </transition-group>
      </div>
      <!-- List end -->

      <!-- Loading Start -->
      <div class="mask" v-if="isLoading">
        <van-loading/>
      </div>
      <!-- Loading End -->

      <!-- Tip Start -->
      <div class="point" v-if="!processList">
        暂无数据
      </div>
      <!-- Tip End -->

    </div>
    <!-- 列表区域 End -->
  </div>
</template>

<script>
import { Loading } from 'vant'
import { Mixin } from '@/util/mixin'
import model from '@/model/client.model'

export default {
  name: 'see',
  metaInfo: {
    title: '查看'
  },
  props: ['ids'],
  mixins: [Mixin],
  components: {
    [Loading.name]: Loading
  },
  data () {
    return {
      // 列表
      processList: [],
      // 是否显示loading加载
      isLoading: false
    }
  },
  methods: {
    // 获取动态表格中的数据
    async getDynamicDataList () {
      // formId_appId_menuId_limitMenuId_triggerId_keyId
      this.isLoading = true
      let idArr = this.ids.split('_')
      let json = {
        appId: idArr[1],
        formId: idArr[0],
        menuId: idArr[2]
      }
      let res = await model.getCreateList(json)
      this.isLoading = false
      if (res.dataList.length === 0) return (this.processList = undefined)
      this.processList = res.dataList
    },
    // 去详情
    goProgressDetail (obj) {
      // formId_nodeId_pcId_processId_appId_roleId_keyId_isHandle
      let ids = `${obj.cfrm_id}_${obj.proc_nodeid}_${obj.pc_id}_${obj.Processid}_3_-1_-1_1`
      this.$router.push(`/progressDetail/${ids}`)
    }
  },
  mounted () {
    this.getDynamicDataList()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "see";
</style>
