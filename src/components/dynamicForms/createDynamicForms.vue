<!-- 新增 动态表单 新增走流程 -->
<template>
  <div id="createDynamicForms">
    <!-- 动态表单 Start -->
    <div class="create-dynamic-forms-block">
      <dynamic-forms :fieldList="fieldList"></dynamic-forms>
    </div>
    <!-- 动态表单 End-->

    <!-- 弹框 Start-->
    <pro-pop :list="roleList" listType="radio" ref="proPop" @popSub="popSub"></pro-pop>
    <!-- 弹框 End-->

    <!-- Loading Start-->
    <div class="mask" v-show="!fieldList">
      <van-loading/>
    </div>
    <!-- Loading End-->
  </div>
</template>

<script>
import { Loading, Popup, Button, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'
import model from '../../model/client.model'
import { Mixin } from '../../util/mixin'
import DynamicForms from '../../components/dynamicForms/dynamicForms'
import ProPop from '../../components/proPop/proPop'
import { FormsUtil } from '../../components/dynamicForms/formsUtil'

export default {
  name: 'createDynamicForms',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    DynamicForms: DynamicForms,
    ProPop: ProPop,
    [Loading.name]: Loading,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
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
      fieldList: undefined,
      // 流程相关ID
      processObj: {},
      // 角色列表
      roleList: []
    }
  },
  methods: {
    // 弹框数据确认
    popSub (val) {
      this.processObj.roleId = val
      // 设置fieldList为undefined开启loading
      this.fieldList = undefined
      this.getFieldsInNode()
    },
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
      let res = await model.checkProcessLimitMenu(this.processJson)
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
        this.roleList = res.roleList
        // 必须设置fieldList为空数组，关闭loading
        setTimeout(() => {
          this.fieldList = []
          this.$refs.proPop.show()
        }, 500)
      } else {
        // 单个角色
        this.processObj.roleId = res.roleId
        this.getFieldsInNode()
      }
    },
    // 2.获取动态表单
    async getFieldsInNode () {
      let res = await model.getFieldsInNode(this.processObj)
      console.log(res)
      // 表单列表 数据处理
      // if (res.errMsg) return this.showToast(res.errMsg)
      this.fieldList = FormsUtil.getInstance(res.fieldList).init()
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

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #createDynamicForms {
    height: 100%;
    width: 100%;
  }

</style>
