<!-- 新增 动态表单 新增走流程 -->
<template>
  <div id="createDynamicForms">
    <div class="create-dynamic-forms-block">
      <dynamic-forms :fieldList="fieldList"></dynamic-forms>
    </div>
  </div>
</template>

<script>
import model from '../../model/client.model'
import { Mixin } from '../../util/mixin'
import DynamicForms from '../../components/dynamicForms/dynamicForms'

export default {
  name: 'createDynamicForms',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: { DynamicForms: DynamicForms },
  props: {
    // 验证是否有流程所需参数
    processJson: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 动态表单
      fieldList: [],
      // 流程相关ID
      processObj: {}
    }
  },
  methods: {
    // 获取当前应用表单
    async getFromListByApp () {
      let res = await model.getFromListByApp(this.processJson)
      this.formList = res.formList
      if (this.formList.length > 1) {
        // 多张表单
      } else {
        // 单张表单
        this.processJson.limitMenuId = this.formList[0].menuLimitid
        this.processJson.formId = this.formList[0].formId
        this.processJson.menuId = this.formList[0].menuId
        this.checkProcessLimitMenu()
      }
    },
    // 1.验证有没有流程
    async checkProcessLimitMenu () {
      // this.$vux.loading.show()
      let res = await model.checkProcessLimitMenu(this.processJson)
      // this.$vux.loading.hide()
      // if (res.errMsg) return this.showToast(res.errMsg)
      this.processObj.pcId = -1
      this.processObj.formId = res.formId
      this.processObj.nodeId = res.nodeId
      this.processObj.appId = res.appId
      this.processObj.processId = res.processId
      this.processObj.triggerId = this.processJson.triggerId
      this.processObj.keyId = this.processJson.keyId
      if (res.roleTotal > 1) {
        // 多个角色
      } else {
        // 单个角色
        this.processObj.roleId = res.roleId
        this.getFieldsInNode()
      }
    },
    // 2.获取动态表单
    async getFieldsInNode () {
      // this.$vux.loading.show()
      let res = await model.getFieldsInNode(this.processObj)
      console.log(res)
      // this.$vux.loading.hide()
      // 表单列表 数据处理
      // if (res.errMsg) return this.showToast(res.errMsg)
      this.fieldList = res.fieldList
      // 按钮列表
      // this.buttonList = res.buttonList
      // this.buttonList.forEach(item => {
      //   this.showBtnList[item.buttonCode] = item.buttonName
      // })
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped></style>
