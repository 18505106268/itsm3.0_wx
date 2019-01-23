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

    <!-- 操作 Start -->
    <div class="handle-btn">
      <van-button type="primary" size="large" @click="handle">操作</van-button>
    </div>
    <!-- 操作 End -->

    <!-- Actionsheet Start -->
    <van-actionsheet v-model="isShow" :actions="buttonList" @select="onSelect"/>
    <!-- Actionsheet End -->

    <!-- Loading Start-->
    <div class="mask" v-show="!fieldList">
      <van-loading/>
    </div>
    <!-- Loading End-->
  </div>
</template>

<script>
import { Loading, Popup, Button, Checkbox, CheckboxGroup, Cell, CellGroup, Actionsheet, Notify } from 'vant'
import model from '@/model/client.model'
import { Mixin } from '@/util/mixin'
import color from '@/util/color'
import DynamicForms from '@/components/dynamicForms/dynamicForms'
import ProPop from '@/components/proPop/proPop'
import { FormsUtil } from '@/components/dynamicForms/formsUtil'

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
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet,
    [Notify.name]: Notify
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
      roleList: [],
      // 按钮列表
      buttonList: [],
      // 是否显示上拉菜单
      isShow: false
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
      if (res.errMsg) return Notify({ message: res.errMsg, background: color.error })
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
      // 表单列表 数据处理
      if (res.errMsg) return Notify({ message: res.errMsg, background: color.error })
      this.fieldList = FormsUtil.getInstance().init(res.fieldList)
      // 按钮列表
      this.buttonList = res.buttonList.map(item => {
        item.name = item.buttonName
        return item
      })
    },
    // 3.提交数据
    async dynamicSubmit (item, reason) {
      /*
      *processId: 1065
      *nodeId: 3710
      *roleId: 183
      *formId: 247
      *pcId: -1
      *appId: 12
      *reason:
      *triggerId: 32
      *masterId: 81
      *list: [{"id":"479_1","value":"单行文本"},{"id":"480_2","value":""}]
      * */
      let data = {
        json: {
          processId: this.processObj.processId,
          nodeId: this.processObj.nodeId,
          formId: this.processObj.formId,
          pcId: this.processObj.pcId,
          appId: this.processObj.appId,
          roleId: this.processObj.roleId,
          triggerId: this.processObj.triggerId,
          masterId: this.processObj.keyId
        },
        api: ''
      }
      if (reason) {
        data.json.reason = reason
      }
      // 表单验证
      let obj = FormsUtil.getInstance().verify(this.fieldList)
      if (obj.flag !== -1) return Notify({ message: obj.prompt, background: color.error })
      console.log(FormsUtil.getInstance().save(this.fieldList))
      data.json.list = JSON.stringify(FormsUtil.getInstance().save(this.fieldList))
      data.api = item.buttonFunc
      let res = await model.dynamicSubmit(data)
      console.log(res)
      // try {
      //   this.$vux.loading.show()
      //   let res = await this['common/dynamicSubmit'](data)
      //   this.$vux.loading.hide()
      //   if (res.errMsg) {
      //     // 完成
      //     this.showToast(res.errMsg)
      //     setTimeout(() => {
      //       if (this.processObj.triggerId === '-1') {
      //         this.$router.go(-1)
      //       } else {
      //         this.$router.replace('/home')
      //       }
      //     }, 1000)
      //   } else {
      //     this.processObj.pcId = res.pcId
      //     this.processObj.nodeId = res.nextNodeId
      //     this.processObj.pRecoId = res.recoId
      //     this.signStart = res.signStart
      //     this.$refs.nextRolePopup.style.height = `${window.innerHeight * 0.85 - 42}px`
      //     // 多个角色
      //     this.userRoleList = res.userRoleList.map((item, index) => {
      //       return {key: `${index}_${item.userId}_${item.roleId}`, value: item.userName, inlineDesc: item.roleName}
      //     })
      //     // 判断是否是会签，会签默认全选
      //     if (Number(this.signStart) === 1) {
      //       this.userRoleListValue = this.userRoleList.map(item => {
      //         return item.key
      //       })
      //     }
      //     // 下一节点人员选择
      //     this.showNextPopup = true
      //   }
      // } catch (e) {
      //   this.$vux.loading.hide()
      // }
    },
    // 上拉菜单事件监听 按钮操作
    onSelect (item) {
      this.processObj.result = item.result
      this.processObj.flag = item.flag
      switch (item.buttonCode) {
        case 'CANCEL':
          break
        case 'REJECT':
          break
        case 'ACCEPT':
          break
        default:
          if (!item.hasReason) {
            this.dynamicSubmit(item)
          } else {
            // 需说明理由
          }
      }
    },
    // 开启上拉菜单
    handle () {
      this.isShow = true
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

  .handle-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
